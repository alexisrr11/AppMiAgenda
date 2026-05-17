import './ContacsHeader.css';

interface ContactsHeaderProps {
  onCreateContact: () => void;
}

function ContactsHeader({ onCreateContact }: ContactsHeaderProps) {
  return (
    <header className="contacts-header">
      <div>
        <h1>Gestión de Contactos</h1>

        <p>
          Administración completa de clientes y contactos comerciales
        </p>
      </div>

      <button
        className="primary-button"
        type="button"
        onClick={onCreateContact}
      >
        + Nuevo Contacto
      </button>
    </header>
  );
}

export default ContactsHeader;
