import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function runSqlAsync(sql, params) {
  return new Promise((resolve) => {
    db.run(sql, params, function () {
      resolve(this);
    });
  });
}

function eachSqlAsync(sql) {
  db.each(sql, (_, row) => {
    console.log(`{ID:${row.id}, タイトル:${row.title}}`);
  });
}

runSqlAsync(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runSqlAsync("INSERT INTO books (title) VALUES (?)", ["チェリー本"]);
  })
  .then((result) => {
    console.log(`ID${result.lastID}が自動採番されました。`);
    return runSqlAsync("INSERT INTO books (title) VALUES (?)", [
      "ゼロからわかるRuby超入門",
    ]);
  })
  .then((result) => {
    console.log(`ID${result.lastID}が自動採番されました。`);
    eachSqlAsync("SELECT id, title FROM books");
  });
