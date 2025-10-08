import { runSqlAsync, eachSqlAsync, closeDb } from "../db.js";

runSqlAsync(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runSqlAsync("INSERT INTO books (title) VALUES (?)", [null]);
  })
  .catch((err) => {
    console.error(`エラーを伴うレコードの追加: ${err.message}`);
  })
  .then(() => {
    return eachSqlAsync("SELECT id, hogehoge FROM books");
  })
  .catch((err) => {
    console.error(`エラーを伴うレコードの取得: ${err.message}`);
  })
  .then(() => {
    return runSqlAsync("DROP TABLE books");
  })
  .then(() => {
    closeDb();
  });
