import type { Contact } from '../../../types/contacts.types';
import './ContactRow.css';

interface ContactRowProps {
  contact: Contact;
  deleting?: boolean;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

const getStatusClassName = (estado: string) => {
  return estado === 'activo' ? 'status-active' : 'status-inactive';
};

const getStatusLabel = (estado: string) => {

  if (estado === 'activo') {
    return 'Contactado';
  }

  if (estado === 'inactivo') {
    return 'No contactado';
  }

  return estado;
};

const ContactRow = ({
  contact,
  deleting = false,
  onEdit,
  onDelete
}: ContactRowProps) => {
  return (
    <tr>
      <td>{contact.empresa}</td>

      <td>{contact.nombre}</td>

      <td>{contact.telefono_primario}</td>

      <td>{contact.telefono_secundario || '-'}</td>

      <td>
        <span className={getStatusClassName(contact.estado)}>
          {getStatusLabel(contact.estado)}
        </span>
      </td>

      <td>
        <div className="actions">
          <button
            className="edit-button"
            type="button"
            onClick={() => onEdit(contact)}
            disabled={deleting}
          >
            Editar
          </button>

          <button
            className="delete-button"
            type="button"
            onClick={() => onDelete(contact.id)}
            disabled={deleting}
          >
            {deleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ContactRow;
