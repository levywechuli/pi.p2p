const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const DB_PATH = path.join(__dirname, '../data/messages.db');

let db = null;

// Initialize database connection
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    // Create data directory if it doesn't exist
    const fs = require('fs');
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
        return;
      }

      console.log('Connected to SQLite database');
      
      // Create messages table if it doesn't exist
      createTables()
        .then(() => {
          console.log('Database tables created/verified');
          resolve();
        })
        .catch(reject);
    });
  });
}

// Create necessary tables
function createTables() {
  return new Promise((resolve, reject) => {
    const createMessagesTable = `
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_identifier TEXT,
        message_content TEXT NOT NULL,
        word_count INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.run(createMessagesTable, (err) => {
      if (err) {
        console.error('Error creating messages table:', err);
        reject(err);
        return;
      }
      
      console.log('Messages table created/verified successfully');
      resolve();
    });
  });
}

// Get database instance
function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}

// Database query wrapper with promises
function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    
    database.run(query, params, function(err) {
      if (err) {
        reject(err);
        return;
      }
      
      resolve({
        id: this.lastID,
        changes: this.changes
      });
    });
  });
}

// Database select wrapper with promises
function selectQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    
    database.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      
      resolve(rows);
    });
  });
}

// Database select single row wrapper with promises
function selectOneQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    
    database.get(query, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      
      resolve(row);
    });
  });
}

// Close database connection
function closeDatabase() {
  return new Promise((resolve) => {
    if (db) {
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err);
        } else {
          console.log('Database connection closed');
        }
        db = null;
        resolve();
      });
    } else {
      resolve();
    }
  });
}

// Graceful shutdown handler
process.on('SIGINT', async () => {
  console.log('\nReceived SIGINT. Closing database connection...');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nReceived SIGTERM. Closing database connection...');
  await closeDatabase();
  process.exit(0);
});

module.exports = {
  initializeDatabase,
  getDatabase,
  runQuery,
  selectQuery,
  selectOneQuery,
  closeDatabase
};