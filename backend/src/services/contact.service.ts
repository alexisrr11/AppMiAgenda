import {
  create,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
} from "../models/contact.model.js";
import { CreateContactDTO } from "../types/type.contacts.js";

// CREATE
export const createContactService = (
  data: CreateContactDTO
): { id: number } => {

  if (!data.empresa) {
    throw new Error("Empresa requerida");
  }

  return create(data);

};

// GET ALL
export const getContactsService = () => {
  return getContacts();
};

// GET BY ID
export const getContactByIdService = (
  id: number
) => {
  return getContactById(id);
};

// UPDATE
export const updateContactService = (
  id: number,
  data: CreateContactDTO
) => {
  if (!data.empresa) {
    throw new Error("Empresa requerida");
  }
  return updateContact(id, data);
};

// DELETE
export const deleteContactService = (
  id: number
) => {
  return deleteContact(id);
};