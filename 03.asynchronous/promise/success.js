import { runSqlAsync, eachSqlAsync, closeDb } from "../db.js";

runSqlAsync(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runSqlAsync("INSERT INTO books (title) VALUES (?)", ["チェリー本"]);
  })
  .then((result) => {
    console.log(`ID${result.lastID}が自動採番されました。`);
    return runSqlAsync("INSERT INTO books (title) VALUES (?)", [
      "ゼロからわかるRuby超入門",
    ]);
  })
  .then((result) => {
    console.log(`ID${result.lastID}が自動採番されました。`);
    return eachSqlAsync("SELECT id, title FROM books");
  })
  .then(() => {
    return runSqlAsync("DROP TABLE books");
  })
  .then(() => {
    closeDb();
  });
