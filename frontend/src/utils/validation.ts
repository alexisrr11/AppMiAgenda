import type { LoginPayload, RegisterPayload } from '../types/users.types';

export type FormErrors<T> = Partial<Record<keyof T, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegisterForm = (values: RegisterPayload): FormErrors<RegisterPayload> => {
  const errors: FormErrors<RegisterPayload> = {};

  if (!values.name.trim()) {
    errors.name = 'El nombre es obligatorio.';
  }

  if (!values.email.trim()) {
    errors.email = 'El email es obligatorio.';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Ingresá un email válido.';
  }

  if (!values.password) {
    errors.password = 'La contraseña es obligatoria.';
  } else if (values.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.';
  }

  return errors;
};

export const validateLoginForm = (values: LoginPayload): FormErrors<LoginPayload> => {
  const errors: FormErrors<LoginPayload> = {};

  if (!values.email.trim()) {
    errors.email = 'El email es obligatorio.';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Ingresá un email válido.';
  }

  if (!values.password) {
    errors.password = 'La contraseña es obligatoria.';
  }

  return errors;
};

export const hasErrors = <T extends Record<string, unknown>>(errors: FormErrors<T>) => {
  return Object.values(errors).some(Boolean);
};
