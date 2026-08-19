const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../production.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(' Database connection failed:', err.message);
  } else {
    console.log('Connected to SQLite production database.');
  }
});

// Run table schema setup & migrations
db.serialize(() => {
  db.run(`PRAGMA foreign_keys = ON;`);

  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    priority TEXT CHECK(priority IN ('LOW', 'MEDIUM', 'HIGH')) DEFAULT 'MEDIUM',
    status TEXT CHECK(status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED')) DEFAULT 'PENDING',
    deleted_at DATETIME DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE INDEX IF NOT EXISTS idx_tasks_status_deleted ON tasks(status, deleted_at);`);
});

module.exports = db;