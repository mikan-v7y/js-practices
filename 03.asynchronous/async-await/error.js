import { runSqlAsync } from "../db.js";

async function f() {
  await runSqlAsync(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  try {
    await runSqlAsync("INSERT INTO books (title) VALUES (?)", [null]);
  } catch (err) {
    console.error(`エラーを伴うレコードの追加: ${err.message}`);
  }
}

f();
