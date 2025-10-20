import { db, runSqlAsync, eachSqlAsync, closeDb } from "../db.js";

runSqlAsync(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runSqlAsync(db, "INSERT INTO books (title) VALUES (?)", [null]);
  })
  .catch((err) => {
    console.error(`エラーを伴うレコードの追加: ${err.message}`);
  })
  .then(() => {
    return eachSqlAsync(db, "SELECT id, hogehoge FROM books");
  })
  .catch((err) => {
    console.error(`エラーを伴うレコードの取得: ${err.message}`);
  })
  .then(() => {
    return runSqlAsync(db, "DROP TABLE books");
  })
  .then(() => {
    closeDb();
  });
