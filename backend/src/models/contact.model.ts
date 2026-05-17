import db from "../configs/db.js";
import { CreateContactDTO } from "../types/type.contacts.js";

// CREATE
export const create = (
  data: CreateContactDTO
): Promise<{ id: number }> => {

  return new Promise<{ id: number }>(
    (resolve, reject) => {

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

      db.run(
        query,
        [
          data.empresa,
          data.nombre,
          data.numUno,
          data.numDos,
          data.estado
        ],
        function (error) {

          if (error) {
            reject(error);
            return;
          }

          resolve({
            id: this.lastID
          });

        }
      );
    }
  );
};

// GET ALL
export const getContacts = () => {
  return new Promise((resolve, reject) => {

    const query = `
      SELECT * FROM contacts
    `;

    db.all(query, [], (error, rows) => {

      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
};

// GET BY ID
export const getContactById = (
  id: number
) => {

  return new Promise((resolve, reject) => {

    const query = `
      SELECT * FROM contacts
      WHERE id = ?
    `;

    db.get(query, [id], (error, row) => {

      if (error) {
        reject(error);
        return;
      }

      resolve(row);

    });
  });
};

// UPDATE
export const updateContact = (
  id: number,
  data: CreateContactDTO
) => {

  return new Promise((resolve, reject) => {

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

    db.run(
      query,
      [
        data.empresa,
        data.nombre,
        data.numUno,
        data.numDos,
        data.estado,
        id
      ],
      function (error) {

        if (error) {
          reject(error);
          return;
        }

        resolve({
          changes: this.changes
        });

      }
    );
  });
};

// DELETE
export const deleteContact = (
  id: number
) => {

  return new Promise((resolve, reject) => {

    const query = `
      DELETE FROM contacts
      WHERE id = ?
    `;

    db.run(query, [id], function (error) {

      if (error) {
        reject(error);
        return;
      }

      resolve({
        changes: this.changes
      });

    });

  });

};