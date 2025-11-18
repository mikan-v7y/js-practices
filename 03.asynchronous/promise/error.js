import {
  runSqlAsync,
  runStatementAsync,
  eachSqlAsync,
  closeDb,
} from "../db.js";

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

let insertBookStatement;

runSqlAsync(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    insertBookStatement = db.prepare("INSERT INTO books (title) VALUES (?)");
    return runStatementAsync(insertBookStatement, [null]);
  })
  .catch((err) => {
    console.error(`エラーを伴うレコードの追加: ${err.message}`);

    return eachSqlAsync(db, "SELECT id, hogehoge FROM books");
  })
  .catch((err) => {
    console.error(`エラーを伴うレコードの取得: ${err.message}`);

    insertBookStatement.finalize();
    return runSqlAsync(db, "DROP TABLE books");
  })
  .then(() => {
    return closeDb(db);
  });
