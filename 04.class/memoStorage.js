import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default class MemoStorage {
  constructor() {
    this.db = null;
  }

  async connect() {
    if (this.db === null) {
      this.db = await open({
        filename: "./memos.db",
        driver: sqlite3.Database,
      });
      await this.db.exec(`
        CREATE TABLE IF NOT EXISTS memos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          content TEXT NOT NULL
        )
      `);
    }
  }

  async insert(content) {
    await this.db.run("INSERT INTO memos (content) VALUES (?)", content);
  }

  async getAll() {
    return await this.db.all("SELECT * FROM memos");
  }

  async getById(id) {
    return await this.db.get("SELECT * FROM memos WHERE id = ?", id);
  }

  async deleteById(id) {
    await this.db.run("DELETE FROM memos WHERE id = ?", id);
  }
}
