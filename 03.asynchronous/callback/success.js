import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

db.run("INSERT INTO books (title) VALUES ('チェリー本')", function () {
  console.log(`ID${this.lastID}が自動採番されました。`);
});
db.run(
  "INSERT INTO books (title) VALUES ('ゼロからわかるRuby超入門')",
  function () {
    console.log(`ID${this.lastID}が自動採番されました。`);
  },
);
