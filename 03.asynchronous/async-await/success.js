import { runSqlAsync } from "../db.js";

async function f() {
  await runSqlAsync(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  const result1 = await runSqlAsync("INSERT INTO books (title) VALUES (?)", [
    "チェリー本",
  ]);
  console.log(`ID${result1.lastID}が自動採番されました。`);

  const result2 = await runSqlAsync("INSERT INTO books (title) VALUES (?)", [
    "ゼロからわかるRuby超入門",
  ]);
  console.log(`ID${result2.lastID}が自動採番されました。`);
}

f();
