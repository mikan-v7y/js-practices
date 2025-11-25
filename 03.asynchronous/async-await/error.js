import {
  runSqlAsync,
  runStatementAsync,
  eachSqlAsync,
  closeDb,
} from "../db.js";

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

try {
  await runSqlAsync(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  const insertBookStatement = db.prepare(
    "INSERT INTO books (title) VALUES (?)",
  );

  try {
    await runStatementAsync(insertBookStatement, [null]);
  } catch (err) {
    if (err?.code === "SQLITE_CONSTRAINT") {
      console.error(`エラーを伴うレコードの追加: ${err?.message ?? err}`);
    } else {
      throw err;
    }
  }

  try {
    await eachSqlAsync(db, "SELECT id, hogehoge FROM books");
  } catch (err) {
    if (err.code === "SQLITE_ERROR") {
      console.error(`エラーを伴うレコードの取得: ${err.message}`);
    } else {
      throw err;
    }
  }

  insertBookStatement.finalize();
  await runSqlAsync(db, "DROP TABLE books");
  await closeDb(db);
} catch (err) {
  console.error(`想定外のエラー: ${err.message}`);
  throw err;
}
