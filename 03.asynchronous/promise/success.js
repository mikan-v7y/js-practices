import sqlite3 from "sqlite3";

import {
  closeDb,
  eachSqlAsync,
  runSqlAsync,
  runStatementAsync,
} from "../db.js";

const db = new sqlite3.Database(":memory:");

let insertBookStatement;

runSqlAsync(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    insertBookStatement = db.prepare("INSERT INTO books (title) VALUES (?)");
    return runStatementAsync(insertBookStatement, ["チェリー本"]);
  })
  .then((result) => {
    console.log(`ID${result.lastID}が自動採番されました。`);
    return runStatementAsync(insertBookStatement, ["ゼロからわかるRuby超入門"]);
  })
  .then((result) => {
    console.log(`ID${result.lastID}が自動採番されました。`);
    return eachSqlAsync(db, "SELECT id, title FROM books", [], (row) => {
      console.log(`{ID:${row.id}, タイトル:${row.title}}`);
    });
  })
  .then(() => {
    insertBookStatement.finalize();
    return runSqlAsync(db, "DROP TABLE books");
  })
  .then(() => {
    return closeDb(db);
  });
