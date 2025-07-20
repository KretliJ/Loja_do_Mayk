// Lucas: Adicionar funcionalidade de comentários

import sqlite3 from "better-sqlite3";
import path from "path";
import type { Database as SqliteDatabase } from "better-sqlite3";

class DatabaseSingleton {
  private static instance: SqliteDatabase;

  private constructor() {}

  public static getInstance(): SqliteDatabase {
    if (!DatabaseSingleton.instance) {
      const dbPath = path.resolve(process.cwd(), "database/comments.db");
      const db = sqlite3(dbPath);

      db.exec(`
        CREATE TABLE IF NOT EXISTS comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          message TEXT NOT NULL,
          createdAt TEXT NOT NULL
        );
      `);

      DatabaseSingleton.instance = db;
    }

    return DatabaseSingleton.instance;
  }
}

export default DatabaseSingleton;
