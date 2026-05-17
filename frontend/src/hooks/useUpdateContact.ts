import { useState } from 'react';
import { updateContact } from '../services/contacts.service';
import type { UpdateContactPayload } from '../types/contacts.types';

interface UseUpdateContactOptions {
  onSuccess?: () => Promise<void> | void;
}

export const useUpdateContact = (options: UseUpdateContactOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: number, payload: UpdateContactPayload) => {
    setLoading(true);
    setError(null);

    try {
      await updateContact(id, payload);
      await options.onSuccess?.();
    } catch (updateError) {
      const message =
        updateError instanceof Error
          ? updateError.message
          : 'No se pudo actualizar el contacto';

      setError(message);
      throw new Error(message, { cause: updateError });
    } finally {
      setLoading(false);
    }
  };

  return {
    updateContact: update,
    loading,
    error,
    setError
  };
};
