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
export const createContact: RequestHandler = async (
  req,
  res,
  next,
) => {

  try {
    const result = await createContactService(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// GET ALL
export const getContacts: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const result = await getContactsService();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// GET BY ID
export const getContactById: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const id = Number(req.params.id);
    const result = await getContactByIdService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateContact: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const id = Number(req.params.id);
    const result = await updateContactService(
      id,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteContact: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteContactService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};