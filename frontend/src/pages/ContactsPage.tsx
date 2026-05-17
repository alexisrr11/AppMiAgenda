import { useState } from 'react';
import ContactModal from '../components/contacts/ContactModal/ContactModal';
import ContactsFilters from '../components/contacts/ContactsFilters/ContactsFilters';
import ContactsHeader from '../components/contacts/ContactsHeader/ContactsHeader';
import ContactsList from '../components/contacts/ContactList/ContactsList';
import ContactsStats from '../components/contacts/ContactsStats/ContactsStats';
import ContactsTable from '../components/contacts/ContactsTable/ContactsTable';
import { useContacts } from '../hooks/useContacts';
import { useCreateContact } from '../hooks/useCreateContact';
import { useDeleteContact } from '../hooks/useDeleteContact';
import { useUpdateContact } from '../hooks/useUpdateContact';
import type { Contact, CreateContactPayload } from '../types/contacts.types';
import '../styles/contacts.css';

const ContactsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const {
    contacts,
    filteredContacts,
    filters,
    stats,
    loading,
    error,
    refreshContacts,
    updateFilter,
    clearFilters
  } = useContacts();

  const handleMutationSuccess = async () => {
    await refreshContacts();
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const createContactMutation = useCreateContact({
    onSuccess: handleMutationSuccess
  });
  const updateContactMutation = useUpdateContact({
    onSuccess: handleMutationSuccess
  });
  const deleteContactMutation = useDeleteContact({
    onSuccess: refreshContacts
  });

  const handleOpenCreateModal = () => {
    createContactMutation.setError(null);
    updateContactMutation.setError(null);
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (contact: Contact) => {
    createContactMutation.setError(null);
    updateContactMutation.setError(null);
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
    createContactMutation.setError(null);
    updateContactMutation.setError(null);
  };

  const handleSubmitContact = async (payload: CreateContactPayload) => {
    if (selectedContact) {
      await updateContactMutation.updateContact(selectedContact.id, payload);
      return;
    }

    await createContactMutation.createContact(payload);
  };

  const handleDeleteContact = async (id: number) => {
    const shouldDelete = window.confirm('¿Seguro que querés eliminar este contacto?');

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteContactMutation.deleteContact(id);
    } catch {
      // El hook expone el error para mostrarlo en la lista.
    }
  };

  const modalLoading = createContactMutation.loading || updateContactMutation.loading;
  const modalError = selectedContact
    ? updateContactMutation.error
    : createContactMutation.error;

  return (
    <main className="contacts-page">
      <ContactsHeader onCreateContact={handleOpenCreateModal} />

      <ContactsStats stats={stats} />

      <ContactsFilters
        filters={filters}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
      />

      <ContactsList
        loading={loading}
        error={error || deleteContactMutation.error}
        totalContacts={contacts.length}
        filteredContacts={filteredContacts.length}
      />

      <ContactsTable
        contacts={filteredContacts}
        deleting={deleteContactMutation.loading}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteContact}
      />

      <ContactModal
        isOpen={isModalOpen}
        contact={selectedContact}
        loading={modalLoading}
        error={modalError}
        onClose={handleCloseModal}
        onSubmit={handleSubmitContact}
      />
    </main>
  );
};

export default ContactsPage;
