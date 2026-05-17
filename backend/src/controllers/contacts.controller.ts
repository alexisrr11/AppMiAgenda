import { RequestHandler } from "express";

import {
  createContactService,
  getContactsService,
  getContactByIdService,
  updateContactService,
  deleteContactService
}
from "../services/contact.service.js";

// CREATE
export const createContact: RequestHandler = (
  req,
  res,
  next,
) => {

  try {

    const result = createContactService(
      req.body
    );

    res.status(201).json(result);

  } catch (error) {

    next(error);

  }

};

// GET ALL
export const getContacts: RequestHandler = (
  req,
  res,
  next,
) => {

  try {

    const result = getContactsService();

    res.status(200).json(result);

  } catch (error) {

    next(error);

  }

};

// GET BY ID
export const getContactById: RequestHandler = (
  req,
  res,
  next,
) => {

  try {

    const id = Number(req.params.id);

    const result = getContactByIdService(
      id
    );

    res.status(200).json(result);

  } catch (error) {

    next(error);

  }

};

// UPDATE
export const updateContact: RequestHandler = (
  req,
  res,
  next,
) => {

  try {

    const id = Number(req.params.id);

    const result = updateContactService(
      id,
      req.body
    );

    res.status(200).json(result);

  } catch (error) {

    next(error);

  }

};

// DELETE
export const deleteContact: RequestHandler = (
  req,
  res,
  next,
) => {

  try {

    const id = Number(req.params.id);

    const result = deleteContactService(
      id
    );

    res.status(200).json(result);

  } catch (error) {

    next(error);

  }

};