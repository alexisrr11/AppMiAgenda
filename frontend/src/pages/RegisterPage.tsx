import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import FormField from '../components/FormField';
import { useAuth } from '../hooks/useAuth';
import { register } from '../services/auth.service';
import type { RegisterPayload } from '../types/users.types';
import { hasErrors, validateRegisterForm } from '../utils/validation';
import type { FormErrors } from '../utils/validation';

const initialValues: RegisterPayload = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const [values, setValues] = useState<RegisterPayload>(initialValues);
  const [errors, setErrors] = useState<FormErrors<RegisterPayload>>({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
    setApiError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateRegisterForm(values);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      await register(values);
      navigate('/login', {
        replace: true,
        state: { successMessage: 'Usuario registrado. Ya podés iniciar sesión.' },
      });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'No se pudo completar el registro.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      badge="Crear cuenta"
      title="Registrate en Mi Agenda"
      subtitle="Completá tus datos para crear tu usuario y empezar a usar la app."
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {apiError ? <div className="alert alert--error">{apiError}</div> : null}

        <FormField
          label="Nombre"
          name="name"
          value={values.name}
          placeholder="Ej: Pepe"
          autoComplete="name"
          error={errors.name}
          onChange={handleChange}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          placeholder="nombre@gmail.com"
          autoComplete="email"
          error={errors.email}
          onChange={handleChange}
        />

        <FormField
          label="Contraseña"
          name="password"
          type="password"
          value={values.password}
          placeholder="Mínimo 6 caracteres"
          autoComplete="new-password"
          error={errors.password}
          onChange={handleChange}
        />

        <button className="button button--primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Crear cuenta'}
        </button>
      </form>

      <p className="auth-link">
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
