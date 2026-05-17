import type { Contact, CreateContactPayload } from '../../../types/contacts.types';
import ContactForm from '../ContactForm/ContactForm';
import './ContactModal.css';

interface ContactModalProps {
  isOpen: boolean;
  contact?: Contact | null;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (payload: CreateContactPayload) => Promise<void>;
}

const ContactModal = ({
  isOpen,
  contact,
  loading = false,
  error,
  onClose,
  onSubmit
}: ContactModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" style={{ display: 'flex' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{contact ? 'Editar Contacto' : 'Nuevo Contacto'}</h2>

          <button type="button" onClick={onClose} disabled={loading}>
            ×
          </button>
        </div>

        <ContactForm
          contact={contact}
          loading={loading}
          error={error}
          onCancel={onClose}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default ContactModal;
