import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function runSqlAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function eachSqlAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.each(
      sql,
      params,
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          console.log(row);
        }
      },
      (err, count) => {
        if (err) reject(err);
        else resolve(count);
      },
    );
  });
}

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
    db.close();
  });
