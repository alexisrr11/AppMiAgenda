import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import db from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, "../../database/schema.sql");

interface TableColumnInfo {
  name: string;
}

const runSql = (query: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(query, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
};

const getUserColumns = (): Promise<TableColumnInfo[]> => {
  return new Promise((resolve, reject) => {
    db.all("PRAGMA table_info(users)", (error, rows: TableColumnInfo[]) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
};

const migrateUsersNameColumn = async (): Promise<void> => {
  const columns = await getUserColumns();
  const hasNameColumn = columns.some((column) => column.name === "name");

  if (!hasNameColumn) {
    await runSql("ALTER TABLE users ADD COLUMN name TEXT NOT NULL DEFAULT ''");
  }
};

export const initDb = async (): Promise<void> => {
  const schema = await fs.readFile(schemaPath, "utf-8");

  await new Promise<void>((resolve, reject) => {
    db.exec(schema, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

  await migrateUsersNameColumn();

  console.log("Tablas verificadas");
};

export default initDb;
