import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

export function runSqlAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

export function eachSqlAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.each(
      sql,
      params,
      (err, row) => {
        if (err) reject(err);
        else console.log(`{ID:${row.id}, タイトル:${row.title}}`);
      },
      (err) => {
        if (err) reject(err);
        else resolve();
      },
    );
  });
}

export function closeDb() {
  db.close();
}
