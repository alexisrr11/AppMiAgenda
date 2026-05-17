import db from "../configs/db.js";

import type {
  CreateUserDTO,
  PublicUser,
  UpdateUserDTO,
  User
} from "../types/type.users.js";

export const createUser = (data: CreateUserDTO): Promise<{ id: number }> => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;

    db.run(query, [data.name, data.email, data.password], function (error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({ id: this.lastID });
    });
  });
};

export const findUserByEmail = (email: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, name, email, password
      FROM users
      WHERE email = ?
    `;

    db.get(query, [email], (error, row: User | undefined) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row ?? null);
    });
  });
};

export const findUserById = (id: number): Promise<PublicUser | null> => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, name, email
      FROM users
      WHERE id = ?
    `;

    db.get(query, [id], (error, row: PublicUser | undefined) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row ?? null);
    });
  });
};

export const updateUser = (
  id: number,
  data: UpdateUserDTO
): Promise<{ changes: number }> => {
  return new Promise((resolve, reject) => {
    const fields: string[] = [];
    const values: string[] = [];

    if (data.name !== undefined) {
      fields.push("name = ?");
      values.push(data.name);
    }

    if (data.email !== undefined) {
      fields.push("email = ?");
      values.push(data.email);
    }

    if (data.password !== undefined) {
      fields.push("password = ?");
      values.push(data.password);
    }

    if (fields.length === 0) {
      resolve({ changes: 0 });
      return;
    }

    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = ?
    `;

    db.run(query, [...values, id], function (error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({ changes: this.changes });
    });
  });
};
