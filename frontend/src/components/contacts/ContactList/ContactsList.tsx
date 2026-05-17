interface ContactsListProps {
  loading: boolean;
  error: string | null;
  totalContacts: number;
  filteredContacts: number;
}

function ContactsList({
  loading,
  error,
  totalContacts,
  filteredContacts
}: ContactsListProps) {
  if (loading) {
    return <h3 className="contacts-list-message">Cargando contactos...</h3>;
  }

  if (error) {
    return <h3 className="contacts-list-message">{error}</h3>;
  }

  if (totalContacts === 0) {
    return <h3 className="contacts-list-message">No hay contactos</h3>;
  }

  if (filteredContacts === 0) {
    return (
      <h3 className="contacts-list-message">
        No hay contactos que coincidan con los filtros
      </h3>
    );
  }

  return null;
}

export default ContactsList;
