import type { Contact } from '../../../types/contacts.types';
import ContactRow from '../ContactRow/ContactRow';
import './ContactsTable.css';

interface ContactsTableProps {
  contacts: Contact[];
  deleting?: boolean;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

const ContactsTable = ({
  contacts,
  deleting = false,
  onEdit,
  onDelete
}: ContactsTableProps) => {
  if (contacts.length === 0) {
    return null;
  }

  return (
    <section className="table-container" style={{ display: 'block' }}>
      <table>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Nombre</th>
            <th>Teléfono Primario</th>
            <th>Teléfono Secundario</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              deleting={deleting}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ContactsTable;
