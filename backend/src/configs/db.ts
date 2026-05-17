import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseDir = path.resolve(
  __dirname,
  "../../database"
);

const databasePath = path.join(
  databaseDir,
  "database.sqlite"
);

fs.mkdirSync(databaseDir, {
  recursive: true
});

const db = new Database(databasePath);

console.log("SQLite conectado");

export default db;