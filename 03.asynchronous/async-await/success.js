import { db, runSqlAsync, eachSqlAsync, closeDb } from "../db.js";

async function f() {
  await runSqlAsync(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  const result1 = await runSqlAsync(
    db,
    "INSERT INTO books (title) VALUES (?)",
    ["チェリー本"],
  );
  console.log(`ID${result1.lastID}が自動採番されました。`);

  const result2 = await runSqlAsync(
    db,
    "INSERT INTO books (title) VALUES (?)",
    ["ゼロからわかるRuby超入門"],
  );
  console.log(`ID${result2.lastID}が自動採番されました。`);

  await eachSqlAsync(db, "SELECT id, title FROM books", [], (row) => {
    console.log(`{ID:${row.id}, タイトル:${row.title}}`);
  });

  await runSqlAsync(db, "DROP TABLE books");

  closeDb;
}

f();
