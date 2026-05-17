import { useCallback, useEffect, useMemo, useState } from 'react';
import { getContacts } from '../services/contacts.service';
import type { Contact, ContactFiltersState, ContactStatsData } from '../types/contacts.types';

const initialFilters: ContactFiltersState = {
  search: '',
  estado: ''
};

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filters, setFilters] = useState<ContactFiltersState>(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const contactsResponse = await getContacts();
      setContacts(contactsResponse);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : 'No se pudieron obtener los contactos'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchContacts();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchContacts]);

  const filteredContacts = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return contacts.filter((contact) => {
      const matchesSearch = normalizedSearch
        ? contact.empresa.toLowerCase().includes(normalizedSearch) ||
          contact.nombre.toLowerCase().includes(normalizedSearch) ||
          String(contact.telefono_primario).toLowerCase().includes(normalizedSearch) ||
          String(contact.telefono_secundario ?? '').toLowerCase().includes(normalizedSearch)
        : true;

      const matchesStatus = filters.estado
        ? contact.estado === filters.estado
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [contacts, filters]);

  const stats = useMemo<ContactStatsData>(() => {
    return contacts.reduce(
      (accumulator, contact) => {
        accumulator.total += 1;

        if (contact.estado === 'activo') {
          accumulator.activos += 1;
        }

        if (contact.estado === 'inactivo') {
          accumulator.inactivos += 1;
        }

        return accumulator;
      },
      {
        total: 0,
        activos: 0,
        inactivos: 0
      }
    );
  }, [contacts]);

  const updateFilter = useCallback(
    (name: keyof ContactFiltersState, value: string) => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        [name]: value
      }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    contacts,
    filteredContacts,
    filters,
    stats,
    loading,
    error,
    refreshContacts: fetchContacts,
    updateFilter,
    clearFilters
  };
};
