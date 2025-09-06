const express = require('express');
const { runQuery, selectQuery, selectOneQuery } = require('../database/database');
const { validateMessage } = require('../middleware/validation');

const router = express.Router();

// ✅ POST /api/messages - Save a new message
router.post('/', validateMessage, async (req, res) => {
  try {
    const { message, userIdentifier } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    // Count words
    const wordCount = message.trim().split(/\s+/).length;

    if (wordCount > 24) {
      return res.status(400).json({
        success: false,
        error: 'Message exceeds 24-word limit',
        wordCount,
        maxWords: 24
      });
    }

    const result = await runQuery(
      `INSERT INTO messages (user_identifier, message_content, word_count, created_at, updated_at)
       VALUES (?, ?, ?, datetime('now'), datetime('now'))`,
      [userIdentifier || 'anonymous', message, wordCount]
    );

    res.status(201).json({
      success: true,
      data: {
        messages: [
          {
            id: result.lastID, // ✅ Use lastID from SQLite
            user_identifier: userIdentifier || 'anonymous',
            message_content: message,
            word_count: wordCount,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ],
        pagination: {
          page: 1,
          limit: 1,
          total: 1,
          totalPages: 1
        }
      }
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message',
      details: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// ✅ GET /api/messages - Get all messages (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const countResult = await selectOneQuery('SELECT COUNT(*) as count FROM messages');
    const totalMessages = countResult.count;

    const messages = await selectQuery(
      `SELECT * FROM messages 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          page,
          limit,
          total: totalMessages,
          totalPages: Math.ceil(totalMessages / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages',
      details: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// ✅ GET /api/messages/count - Get counts
router.get('/count', async (req, res) => {
  try {
    const totalResult = await selectOneQuery('SELECT COUNT(*) as count FROM messages');
    const todayResult = await selectOneQuery(
      `SELECT COUNT(*) as count FROM messages 
       WHERE date(created_at) = date('now')`
    );

    res.json({
      success: true,
      data: {
        stats: {
          total: totalResult.count,
          today: todayResult.count
        }
      }
    });
  } catch (error) {
    console.error('Error counting messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to count messages',
      details: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// ✅ GET /api/messages/:id - Get message by ID
router.get('/:id', async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);

    if (isNaN(messageId)) {
      return res.status(400).json({ success: false, error: 'Invalid message ID' });
    }

    const message = await selectOneQuery('SELECT * FROM messages WHERE id = ?', [messageId]);

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    res.json({
      success: true,
      data: {
        messages: [message],
        pagination: {
          page: 1,
          limit: 1,
          total: 1,
          totalPages: 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch message',
      details: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// ✅ DELETE /api/messages/:id - Delete by ID
router.delete('/:id', async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);

    if (isNaN(messageId)) {
      return res.status(400).json({ success: false, error: 'Invalid message ID' });
    }

    const result = await runQuery('DELETE FROM messages WHERE id = ?', [messageId]);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete message',
      details: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

module.exports = router;

