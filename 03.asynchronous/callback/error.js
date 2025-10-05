import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    const insertBookStmt = db.prepare("INSERT INTO books (title) VALUES (?)");

    insertBookStmt.run(null, function (err) {
      if (err) {
        console.error(`エラーを伴うレコードの追加: ${err.message}`);
      }
    });

    db.each("SELECT id, hogehoge FROM books", function (err) {
      if (err) {
        console.error(`エラーを伴うレコードの取得: ${err.message}`);
      }
    });

    insertBookStmt.finalize();
  },
);
