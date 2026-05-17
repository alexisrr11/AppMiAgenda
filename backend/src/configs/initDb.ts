import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import db from "./db.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(
  __filename
);

const schemaPath = path.resolve(
  __dirname,
  "../../database/schema.sql"
);

interface TableColumnInfo {
  name: string;
}

// RUN SQL
const runSql = (
  query: string
): void => {

  db.exec(query);

};

// GET USER COLUMNS
const getUserColumns = (): TableColumnInfo[] => {

  const rows = db
    .prepare("PRAGMA table_info(users)")
    .all();

  return rows as TableColumnInfo[];

};

// MIGRATION
const migrateUsersNameColumn = async (): Promise<void> => {

  const columns = getUserColumns();

  const hasNameColumn = columns.some(
    (column) => column.name === "name"
  );

  if (!hasNameColumn) {

    runSql(`
      ALTER TABLE users
      ADD COLUMN name TEXT NOT NULL DEFAULT ''
    `);

  }

};

// INIT DB
export const initDb = async (): Promise<void> => {

  const schema = await fs.readFile(
    schemaPath,
    "utf-8"
  );

  db.exec(schema);

  await migrateUsersNameColumn();

  console.log("Tablas verificadas");

};

export default initDb;