const { initializeDatabase } = require('../database/database');

async function initDb() {
  try {
    console.log('Initializing database...');
    await initializeDatabase();
    console.log('✅ Database initialized successfully!');
    console.log('📄 Database file created at: ./data/messages.db');
    console.log('📊 Messages table created and ready to use');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    process.exit(1);
  }
}

initDb();
