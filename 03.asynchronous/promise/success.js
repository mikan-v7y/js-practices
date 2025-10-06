import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function asyncFunc(sql, params) {
  return new Promise((resolve) => {
    db.run(sql, params, function () {
      resolve(this);
    });
  });
}

asyncFunc(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);
