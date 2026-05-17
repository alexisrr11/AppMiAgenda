import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sqlite3 from "sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseDir = path.resolve(__dirname, "../../database");
const databasePath = path.join(databaseDir, "database.sqlite");

fs.mkdirSync(databaseDir, { recursive: true });

sqlite3.verbose();

const db = new sqlite3.Database(databasePath, (error) => {
  if (error) {
    console.error("Error SQLite:", error.message);
    return;
  }

  console.log("SQLite conectado");
});

export default db;
