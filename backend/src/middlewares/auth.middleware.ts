import type { RequestHandler } from "express";

import jwt from "jsonwebtoken";

import { getJwtSecret } from "../configs/env.js";

import { findUserById } from "../models/users.model.js";

import type {
  JwtUserPayload
} from "../types/type.users.js";

const isJwtUserPayload = (
  value: unknown
): value is JwtUserPayload => {

  return (
    typeof value === "object"
    && value !== null
    && typeof (
      value as JwtUserPayload
    ).id === "number"
  );

};

// AUTH MIDDLEWARE
export const authMiddleware: RequestHandler = (
  req,
  res,
  next
) => {

  try {

    const authHeader = req.headers.authorization;

    if (
      !authHeader?.startsWith(
        "Bearer "
      )
    ) {

      res.status(401).json({
        ok: false,
        message: "Token requerido"
      });

      return;

    }

    const token = authHeader
      .slice("Bearer ".length)
      .trim();

    if (!token) {

      res.status(401).json({
        ok: false,
        message: "Token requerido"
      });

      return;

    }

    const decoded = jwt.verify(
      token,
      getJwtSecret()
    );

    if (
      !isJwtUserPayload(decoded)
    ) {

      res.status(401).json({
        ok: false,
        message: "Token inválido"
      });

      return;

    }

    // YA NO USA AWAIT
    const user = findUserById(
      decoded.id
    );

    if (!user) {

      res.status(401).json({
        ok: false,
        message: "Usuario no encontrado"
      });

      return;

    }

    req.user = user;

    next();

  } catch (error) {

    next(error);

  }

};