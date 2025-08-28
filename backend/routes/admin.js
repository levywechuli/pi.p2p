const express = require('express');
const { selectQuery, selectOneQuery, runQuery } = require('../database/database');

const router = express.Router();

// GET /api/admin/dashboard - Get admin dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    // Get total messages count
    const totalResult = await selectOneQuery('SELECT COUNT(*) as count FROM messages');
    
    // Get today's messages count
    const todayResult = await selectOneQuery(
      `SELECT COUNT(*) as count FROM messages 
       WHERE date(created_at) = date('now')`
    );
    
    // Get this week's messages count
    const weekResult = await selectOneQuery(
      `SELECT COUNT(*) as count FROM messages 
       WHERE created_at >= date('now', '-7 days')`
    );
    
    // Get average word count
    const avgWordsResult = await selectOneQuery(
      'SELECT AVG(word_count) as avg_words FROM messages'
    );
    
    // Get recent messages (last 10)
    const recentMessages = await selectQuery(
      `SELECT id, user_identifier, message_content, word_count, created_at 
       FROM messages 
       ORDER BY created_at DESC 
       LIMIT 10`
    );

    // Get messages by day for the last 7 days
    const dailyStats = await selectQuery(
      `SELECT 
         date(created_at) as date,
         COUNT(*) as count
       FROM messages 
       WHERE created_at >= date('now', '-7 days')
       GROUP BY date(created_at)
       ORDER BY date DESC`
    );

    res.json({ 
      success: true, 
      data: {
        stats: {
          totalMessages: totalResult.count,
          todayMessages: todayResult.count,
          weekMessages: weekResult.count,
          averageWords: Math.round(avgWordsResult.avg_words || 0)
        },
        recentMessages,
        dailyStats
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch dashboard data',
      details: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// GET /api/admin/messages - Get all messages with advanced filtering
router.get('/messages', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const sortBy = req.query.sortBy || 'created_at';
    const sortOrder = req.query.sortOrder || 'DESC';
    const minWords = parseInt(req.query.minWords) || 0;
    const maxWords = parseInt(req.query.maxWords) || 1000;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;

    // Build WHERE clause
    let whereClause = 'WHERE word_count >= ? AND word_count <= ?';
    let whereParams = [minWords, maxWords];

    if (search) {
      whereClause += ' AND (message_content LIKE ? OR user_identifier LIKE ?)';
      whereParams.push(`%${search}%`, `%${search}%`);
    }

    if (dateFrom) {
      whereClause += ' AND date(created_at) >= ?';
      whereParams.push(dateFrom);
    }

    if (dateTo) {
      whereClause += ' AND date(created_at) <= ?';
      whereParams.push(dateTo);
    }

    // Get total count with filters
    const countQuery = `SELECT COUNT(*) as count FROM messages ${whereClause}`;
    const countResult = await selectOneQuery(countQuery, whereParams);
    const totalMessages = countResult.count;

    // Get messages with filters, sorting, and pagination
    const messagesQuery = `
      SELECT * FROM messages 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    const messages = await selectQuery(messagesQuery, [...whereParams, limit, offset]);

    res.json({ 
      success: true, 
      data: {
        messages,
        pagination: {
          page,
          limit,
          total: totalMessages,
          totalPages: Math.ceil(totalMessages / limit)
        },
        filters: {
          search,
          sortBy,
          sortOrder,
          minWords,
          maxWords,
          dateFrom,
          dateTo
        }
      }
    });
  } catch (error) {
    console.error('Error fetching admin messages:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch messages',
      details: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// GET /api/admin/stats - Get detailed statistics
router.get('/stats', async (req, res) => {
  try {
    // Word count distribution
    const wordDistribution = await selectQuery(
      `SELECT 
         CASE 
           WHEN word_count <= 5 THEN '1-5 words'
           WHEN word_count <= 10 THEN '6-10 words'
           WHEN word_count <= 15 THEN '11-15 words'
           WHEN word_count <= 20 THEN '16-20 words'
           WHEN word_count <= 24 THEN '21-24 words'
           ELSE '25+ words'
         END as range,
         COUNT(*) as count
       FROM messages 
       GROUP BY range
       ORDER BY MIN(word_count)`
    );

    // Messages per user (top 10)
    const topUsers = await selectQuery(
      `SELECT 
         user_identifier,
         COUNT(*) as message_count,
         AVG(word_count) as avg_words
       FROM messages 
       GROUP BY user_identifier 
       ORDER BY message_count DESC 
       LIMIT 10`
    );

    // Monthly trend (last 12 months)
    const monthlyTrend = await selectQuery(
      `SELECT 
         strftime('%Y-%m', created_at) as month,
         COUNT(*) as count,
         AVG(word_count) as avg_words
       FROM messages 
       WHERE created_at >= date('now', '-12 months')
       GROUP BY month 
       ORDER BY month`
    );

    res.json({ 
      success: true, 
      data: {
        wordDistribution,
        topUsers,
        monthlyTrend
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch statistics',
      details: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// POST /api/admin/cleanup - Clean up old messages (admin action)
router.post('/cleanup', async (req, res) => {
  try {
    const { daysOld = 30 } = req.body;
    
    const result = await runQuery(
      `DELETE FROM messages 
       WHERE created_at < date('now', '-${parseInt(daysOld)} days')`
    );

    console.log(`Cleanup completed - Deleted ${result.changes} messages older than ${daysOld} days`);

    res.json({ 
      success: true, 
      message: `Deleted ${result.changes} messages older than ${daysOld} days`,
      deletedCount: result.changes
    });
  } catch (error) {
    console.error('Error during cleanup:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to cleanup messages',
      details: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

module.exports = router;