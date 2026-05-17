import { useState } from 'react';
import { createContact } from '../services/contacts.service';
import type { CreateContactPayload } from '../types/contacts.types';

interface UseCreateContactOptions {
  onSuccess?: () => Promise<void> | void;
}

export const useCreateContact = (options: UseCreateContactOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (payload: CreateContactPayload) => {
    setLoading(true);
    setError(null);

    try {
      await createContact(payload);
      await options.onSuccess?.();
    } catch (createError) {
      const message =
        createError instanceof Error
          ? createError.message
          : 'No se pudo crear el contacto';

      setError(message);
      throw new Error(message, { cause: createError });
    } finally {
      setLoading(false);
    }
  };

  return {
    createContact: create,
    loading,
    error,
    setError
  };
};
