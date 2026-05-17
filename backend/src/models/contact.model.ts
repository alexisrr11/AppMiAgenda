import db from "../configs/db.js";
import { CreateContactDTO } from "../types/type.contacts.js";

// CREATE
export const create = (
  data: CreateContactDTO
) => {

  const query = `
    INSERT INTO contacts (
      empresa,
      nombre,
      telefono_primario,
      telefono_secundario,
      estado
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const result = db
    .prepare(query)
    .run(
      data.empresa,
      data.nombre,
      data.numUno,
      data.numDos,
      data.estado
    );

  return {
    id: Number(result.lastInsertRowid)
  };

};

// GET ALL
export const getContacts = () => {

  const query = `
    SELECT * FROM contacts
  `;

  return db
    .prepare(query)
    .all();

};

// GET BY ID
export const getContactById = (
  id: number
) => {

  const query = `
    SELECT * FROM contacts
    WHERE id = ?
  `;

  return db
    .prepare(query)
    .get(id);

};

// UPDATE
export const updateContact = (
  id: number,
  data: CreateContactDTO
) => {

  const query = `
    UPDATE contacts
    SET
      empresa = ?,
      nombre = ?,
      telefono_primario = ?,
      telefono_secundario = ?,
      estado = ?
    WHERE id = ?
  `;

  const result = db
    .prepare(query)
    .run(
      data.empresa,
      data.nombre,
      data.numUno,
      data.numDos,
      data.estado,
      id
    );

  return {
    changes: result.changes
  };

};

// DELETE
export const deleteContact = (
  id: number
) => {

  const query = `
    DELETE FROM contacts
    WHERE id = ?
  `;

  const result = db
    .prepare(query)
    .run(id);

  return {
    changes: result.changes
  };

};