export interface Contact {
  id: number;
  empresa: string;
  nombre: string;
  telefonoPrimario: number;
  telefonoSecundario?: number;
  estado: EstadoContacto;
  observaciones?: string;
  createdAt: string;
}

export type EstadoContacto =
  | "completado"
  | "ocupado"
  | "dudoso"
  | "a_llamar";

export interface CreateContactDTO {
  empresa: string;
  nombre: string;
  numUno: number;
  numDos?: number;
  estado: EstadoContacto;
}
