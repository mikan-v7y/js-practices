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

try {
  await runStatementAsync(insertBookStatement, [null]);
} catch (err) {
  console.error(`エラーを伴うレコードの追加: ${err.message}`);
}

try {
  await eachSqlAsync(db, "SELECT id, hogehoge FROM books");
} catch (err) {
  console.error(`エラーを伴うレコードの取得: ${err.message}`);
}

insertBookStatement.finalize();

await runSqlAsync(db, "DROP TABLE books");

await closeDb(db);
