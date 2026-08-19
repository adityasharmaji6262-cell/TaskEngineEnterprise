const db = require('../db/db');

class TaskModel {
  static getAllActive() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM tasks WHERE deleted_at IS NULL ORDER BY created_at DESC`;
      db.all(query, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static create({ title, priority = 'MEDIUM' }) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO tasks (title, priority) VALUES (?, ?)`;
      db.run(query, [title, priority], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, title, priority, status: 'PENDING' });
      });
    });
  }

  static updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE tasks SET status = ? WHERE id = ?`;
      db.run(query, [status, id], function (err) {
        if (err) return reject(err);
        resolve({ updated: this.changes });
      });
    });
  }

  static softDelete(id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE tasks SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) return reject(err);
        resolve({ success: true, deletedId: id });
      });
    });
  }
}

module.exports = TaskModel;