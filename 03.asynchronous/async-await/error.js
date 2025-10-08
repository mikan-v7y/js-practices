import { runSqlAsync, eachSqlAsync, closeDb } from "../db.js";

async function f() {
  await runSqlAsync(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
}

f();
