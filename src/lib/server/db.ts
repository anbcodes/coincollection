import Database from 'better-sqlite3';
import { mkdirSync } from 'fs';

mkdirSync('data/images', { recursive: true });

export const db = new Database('data/coins.db');

// Create the coins table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS coins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    country TEXT NOT NULL,
    year TEXT NOT NULL,
    mint TEXT,
    notes TEXT,
    worth REAL,
    imagef TEXT,
    imageb TEXT
  )
`).run();

