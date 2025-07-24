const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./osint.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);

  // Insert admin user if not exists
  const adminPass = bcrypt.hashSync('admin1919', 10);
  db.run(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`, ['admin', adminPass]);
});

module.exports = db;
