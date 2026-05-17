import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getJwtSecret } from "../configs/env.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser
} from "../models/users.model.js";

import type {
  CreateUserDTO,
  JwtUserPayload,
  LoginDTO,
  PublicUser,
  UpdateUserDTO
} from "../types/type.users.js";

const normalizeEmail = (email: string): string => email.trim().toLowerCase();
const normalizeName = (name: string): string => name.trim();

const validateCredentialsInput = (data: CreateUserDTO | LoginDTO): void => {
  if (!data.email?.trim()) {
    throw new Error("Email requerido");
  }

  if (!data.password) {
    throw new Error("Password requerido");
  }
};

const validateRegisterInput = (data: CreateUserDTO): void => {
  validateCredentialsInput(data);

  if (!data.name?.trim()) {
    throw new Error("Nombre requerido");
  }
};

export const registerService = async (
  data: CreateUserDTO
): Promise<{ id: number; user: PublicUser }> => {
  validateRegisterInput(data);

  const name = normalizeName(data.name);
  const email = normalizeEmail(data.email);
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Usuario ya existe");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const result = await createUser({ name, email, password: hashedPassword });

  return {
    id: result.id,
    user: {
      id: result.id,
      name,
      email
    }
  };
};

export const loginService = async (
  data: LoginDTO
): Promise<{ token: string; user: PublicUser }> => {
  validateCredentialsInput(data);

  const email = normalizeEmail(data.email);
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const validPassword = await bcrypt.compare(data.password, user.password);

  if (!validPassword) {
    throw new Error("Credenciales inválidas");
  }

  const payload: JwtUserPayload = {
    id: user.id
  };

  const token = jwt.sign(payload, getJwtSecret(), {
    expiresIn: "7d"
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
};

export const getMeService = async (id: number): Promise<PublicUser | null> => {
  return findUserById(id);
};

export const updateUserService = async (
  id: number,
  data: UpdateUserDTO
): Promise<{ changes: number }> => {
  const updateData: UpdateUserDTO = { ...data };

  if (updateData.name !== undefined) {
    updateData.name = normalizeName(updateData.name);

    if (!updateData.name) {
      throw new Error("Nombre requerido");
    }
  }

  if (updateData.email !== undefined) {
    updateData.email = normalizeEmail(updateData.email);
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  return updateUser(id, updateData);
};
