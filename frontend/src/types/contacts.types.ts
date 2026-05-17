export type ContactStatus = 'activo' | 'inactivo';

export interface Contact {
  id: number;
  empresa: string;
  nombre: string;
  telefono_primario: string | number;
  telefono_secundario?: string | number | null;
  estado: ContactStatus | string;
}

export interface CreateContactPayload {
  empresa: string;
  nombre: string;
  numUno: string;
  numDos?: string;
  estado: ContactStatus | string;
}

export type UpdateContactPayload = CreateContactPayload;

export interface ContactMutationResponse {
  id?: number;
  changes?: number;
}

export interface ContactFiltersState {
  search: string;
  estado: string;
}

export interface ContactStatsData {
  total: number;
  activos: number;
  inactivos: number;
}
