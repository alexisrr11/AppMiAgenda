import type { ContactFiltersState } from '../../../types/contacts.types';
import './ContactsFilters.css';

interface ContactsFiltersProps {
  filters: ContactFiltersState;
  onFilterChange: (name: keyof ContactFiltersState, value: string) => void;
  onClearFilters: () => void;
}

const ContactsFilters = ({
  filters,
  onFilterChange,
  onClearFilters
}: ContactsFiltersProps) => {
  return (
    <section className="filters-container">
      <input
        type="text"
        placeholder="Buscar empresa o contacto..."
        value={filters.search}
        onChange={(event) => onFilterChange('search', event.target.value)}
      />

      <select
        value={filters.estado}
        onChange={(event) => onFilterChange('estado', event.target.value)}
      >
        <option value="">
          Todos los estados
        </option>

        <option value="activo">
          Contactado
        </option>

        <option value="inactivo">
          No Contactado
        </option>
      </select>

      <button type="button" onClick={onClearFilters}>
        Limpiar filtros
      </button>
    </section>
  );
};

export default ContactsFilters;
