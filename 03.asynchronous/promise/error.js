import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function runSqlAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

runSqlAsync(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runSqlAsync("INSERT INTO books (title) VALUES (?)", [null]);
  })
  .catch((err) => {
    console.error(`エラーを伴うレコードの追加: ${err.message}`);
  });
