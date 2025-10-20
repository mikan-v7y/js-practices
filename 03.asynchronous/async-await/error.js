import { db, runSqlAsync, eachSqlAsync, closeDb } from "../db.js";

async function f() {
  await runSqlAsync(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  try {
    await runSqlAsync(db, "INSERT INTO books (title) VALUES (?)", [null]);
  } catch (err) {
    console.error(`エラーを伴うレコードの追加: ${err.message}`);
  }

  try {
    await eachSqlAsync(db, "SELECT id, hogehoge FROM books");
  } catch (err) {
    console.error(`エラーを伴うレコードの取得: ${err.message}`);
  }

  await runSqlAsync(db, "DROP TABLE books");

  closeDb();
}

f();
