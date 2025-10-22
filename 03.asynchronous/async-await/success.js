import {
  db,
  runSqlAsync,
  runStatementAsync,
  eachSqlAsync,
  closeDb,
} from "../db.js";

await runSqlAsync(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

const insertBookStatement = db.prepare("INSERT INTO books (title) VALUES (?)");

const result1 = await runStatementAsync(insertBookStatement, ["チェリー本"]);
console.log(`ID${result1.lastID}が自動採番されました。`);

const result2 = await runStatementAsync(insertBookStatement, [
  "ゼロからわかるRuby超入門",
]);
console.log(`ID${result2.lastID}が自動採番されました。`);

await eachSqlAsync(db, "SELECT id, title FROM books", [], (row) => {
  console.log(`{ID:${row.id}, タイトル:${row.title}}`);
});

insertBookStatement.finalize();

await runSqlAsync(db, "DROP TABLE books");

await closeDb(db);
