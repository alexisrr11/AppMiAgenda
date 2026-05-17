import type { ErrorRequestHandler } from "express";
import jwt from "jsonwebtoken";

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
    res.status(401).json({
      ok: false,
      message: "Token inválido"
    });
    return;
  }

  res.status(500).json({
    ok: false,
    message: error instanceof Error ? error.message : "Error interno"
  });
};
