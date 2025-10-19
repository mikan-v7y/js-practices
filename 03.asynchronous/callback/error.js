import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    const insertBookStatement = db.prepare(
      "INSERT INTO books (title) VALUES (?)",
    );

    insertBookStatement.run(null, function (err) {
      if (err) {
        console.error(`エラーを伴うレコードの追加: ${err.message}`);
      }

      db.each("SELECT id, hogehoge FROM books", function (err) {
        if (err) {
          console.error(`エラーを伴うレコードの取得: ${err.message}`);
        }

        db.run("DROP TABLE books", () => {
          db.close();
        });
      });

      insertBookStatement.finalize();
    });
  },
);
