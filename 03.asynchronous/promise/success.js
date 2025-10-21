import { db, runSqlAsync, eachSqlAsync, closeDb } from "../db.js";

runSqlAsync(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runSqlAsync(db, "INSERT INTO books (title) VALUES (?)", [
      "チェリー本",
    ]);
  })
  .then((result) => {
    console.log(`ID${result.lastID}が自動採番されました。`);
    return runSqlAsync(db, "INSERT INTO books (title) VALUES (?)", [
      "ゼロからわかるRuby超入門",
    ]);
  })
  .then((result) => {
    console.log(`ID${result.lastID}が自動採番されました。`);
    return eachSqlAsync(db, "SELECT id, title FROM books", [], (row) => {
      console.log(`{ID:${row.id}, タイトル:${row.title}}`);
    });
  })
  .then(() => {
    return runSqlAsync(db, "DROP TABLE books");
  })
  .then(() => {
    closeDb(db);
  });
