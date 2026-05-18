import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Contact, CreateContactPayload } from '../../../types/contacts.types';
import './ContactForm.css';

interface ContactFormProps {
  contact?: Contact | null;
  loading?: boolean;
  error?: string | null;
  onCancel: () => void;
  onSubmit: (payload: CreateContactPayload) => Promise<void>;
}

const getInitialFormData = (contact?: Contact | null): CreateContactPayload => ({
  empresa: contact?.empresa ?? '',
  nombre: contact?.nombre ?? '',
  numUno: contact?.telefono_primario ? String(contact.telefono_primario) : '',
  numDos: contact?.telefono_secundario ? String(contact.telefono_secundario) : '',
  estado: contact?.estado ?? 'inactivo'
});

const ContactForm = ({
  contact,
  loading = false,
  error,
  onCancel,
  onSubmit
}: ContactFormProps) => {
  const [formData, setFormData] = useState<CreateContactPayload>(() =>
    getInitialFormData(contact)
  );
  const [formError, setFormError] = useState<string | null>(null);


  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!formData.empresa.trim() || !formData.nombre.trim() || !formData.numUno.trim()) {
      setFormError('Empresa, nombre y teléfono primario son obligatorios.');
      return;
    }

    try {
      await onSubmit({
        empresa: formData.empresa.trim(),
        nombre: formData.nombre.trim(),
        numUno: formData.numUno.trim(),
        numDos: formData.numDos?.trim() || undefined,
        estado: formData.estado
      });
    } catch {
      // El hook de mutación mantiene el mensaje de error visible en el formulario.
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {(formError || error) ? (
        <div className="alert alert--error">
          {formError || error}
        </div>
      ) : null}

      <div className="form-grid">
        <div>
          <label htmlFor="empresa">Empresa</label>

          <input
            id="empresa"
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="nombre">Nombre</label>

          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="numUno">Teléfono Primario</label>

          <input
            id="numUno"
            type="text"
            name="numUno"
            value={formData.numUno}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="numDos">Teléfono Secundario</label>

          <input
            id="numDos"
            type="text"
            name="numDos"
            value={formData.numDos ?? ''}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="estado">Estado</label>

        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="inactivo">
            No contactado
          </option>
          
          <option value="activo">
            Contactado
          </option>

          
        </select>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>

        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Contacto'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
