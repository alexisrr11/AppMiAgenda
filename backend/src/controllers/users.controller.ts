import type { RequestHandler } from "express";

import {
  getMeService,
  loginService,
  registerService,
  updateUserService
} from "../services/users.service.js";

// REGISTER
export const register: RequestHandler = async (
  req,
  res,
  next
) => {

  try {

    const result = await registerService(
      req.body
    );

    res.status(201).json(result);

  } catch (error) {

    next(error);

  }

};

// LOGIN
export const login: RequestHandler = async (
  req,
  res,
  next
) => {

  try {

    const result = await loginService(
      req.body
    );

    res.status(200).json(result);

  } catch (error) {

    next(error);

  }

};

// ME
export const me: RequestHandler = (
  req,
  res,
  next
) => {

  try {

    if (!req.user) {

      res.status(401).json({
        ok: false,
        message: "Token requerido"
      });

      return;

    }

    const user = getMeService(
      req.user.id
    );

    if (!user) {

      res.status(404).json({
        ok: false,
        message: "Usuario no encontrado"
      });

      return;

    }

    res.status(200).json({
      user
    });

  } catch (error) {

    next(error);

  }

};

// UPDATE USER
export const updateUser: RequestHandler = async (
  req,
  res,
  next
) => {

  try {

    const id = Number(
      req.params.id
    );

    if (
      !Number.isInteger(id)
      || id <= 0
    ) {

      res.status(400).json({
        ok: false,
        message: "Id de usuario inválido"
      });

      return;

    }

    const result = await updateUserService(
      id,
      req.body
    );

    res.status(200).json(result);

  } catch (error) {

    next(error);

  }

};