import db from "../configs/db.js";

import type {
  CreateUserDTO,
  PublicUser,
  UpdateUserDTO,
  User
} from "../types/type.users.js";

// CREATE
export const createUser = (
  data: CreateUserDTO
) => {

  const query = `
    INSERT INTO users (
      name,
      email,
      password
    )
    VALUES (?, ?, ?)
  `;

  const result = db
    .prepare(query)
    .run(
      data.name,
      data.email,
      data.password
    );

  return {
    id: Number(result.lastInsertRowid)
  };

};

// FIND BY EMAIL
export const findUserByEmail = (
  email: string
): User | null => {

  const query = `
    SELECT
      id,
      name,
      email,
      password
    FROM users
    WHERE email = ?
  `;

  const user = db
    .prepare(query)
    .get(email);

  return (user as User) ?? null;

};

// FIND BY ID
export const findUserById = (
  id: number
): PublicUser | null => {

  const query = `
    SELECT
      id,
      name,
      email
    FROM users
    WHERE id = ?
  `;

  const user = db
    .prepare(query)
    .get(id);

  return (user as PublicUser) ?? null;

};

// UPDATE
export const updateUser = (
  id: number,
  data: UpdateUserDTO
) => {

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
    return {
      changes: 0
    };
  }

  const query = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

  const result = db
    .prepare(query)
    .run(
      ...values,
      id
    );

  return {
    changes: result.changes
  };

};