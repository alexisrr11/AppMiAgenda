import { useState } from 'react';
import { deleteContact } from '../services/contacts.service';

interface UseDeleteContactOptions {
  onSuccess?: () => Promise<void> | void;
}

export const useDeleteContact = (options: UseDeleteContactOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteContact(id);
      await options.onSuccess?.();
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : 'No se pudo eliminar el contacto';

      setError(message);
      throw new Error(message, { cause: deleteError });
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteContact: remove,
    loading,
    error,
    setError
  };
};
