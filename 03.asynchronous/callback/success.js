import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    const statement = db.prepare("INSERT INTO books (title) VALUES (?)");

    const insertBookStmt = db.prepare("INSERT INTO books (title) VALUES (?)");

    insertBookStmt.run("チェリー本", function () {
      console.log(`ID${this.lastID}が自動採番されました。`);
    });

    insertBookStmt.run("ゼロからわかるRuby超入門", function () {
      console.log(`ID${this.lastID}が自動採番されました。`);
    });

    insertBookStmt.finalize();
  },
);
