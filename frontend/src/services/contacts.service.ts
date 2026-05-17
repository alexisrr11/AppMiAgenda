import type {
  Contact,
  ContactMutationResponse,
  CreateContactPayload,
  UpdateContactPayload
} from '../types/contacts.types';

const API_URL = import.meta.env.VITE_API_URL;

// GET ALL
export const getContacts = async (): Promise<Contact[]> => {

  const response =
    await fetch(`${API_URL}/contacts`);

  if (!response.ok) {
    throw new Error(
      'Error obteniendo contactos'
    );
  }

  return response.json();
};

// GET BY ID
export const getContactById = async (
  id: number
): Promise<Contact> => {

  const response =
    await fetch(
      `${API_URL}/contacts/${id}`
    );

  if (!response.ok) {
    throw new Error(
      'Error obteniendo contacto'
    );
  }

  return response.json();
};

// CREATE
export const createContact = async (
  payload: CreateContactPayload
): Promise<ContactMutationResponse> => {

  const response = await fetch(
    `${API_URL}/contacts`,
    {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    throw new Error(
      'Error creando contacto'
    );
  }

  return response.json();
};

// UPDATE
export const updateContact = async (
  id: number,
  payload: UpdateContactPayload
): Promise<ContactMutationResponse> => {

  const response = await fetch(
    `${API_URL}/contacts/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type':
          'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    throw new Error(
      'Error actualizando contacto'
    );
  }

  return response.json();
};

// DELETE
export const deleteContact = async (
  id: number
): Promise<void> => {

  const response = await fetch(
    `${API_URL}/contacts/${id}`,
    {
      method: 'DELETE'
    }
  );

  if (!response.ok) {
    throw new Error(
      'Error eliminando contacto'
    );
  }
};