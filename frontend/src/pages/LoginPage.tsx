import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import FormField from '../components/FormField';
import { useAuth } from '../hooks/useAuth';
import type { LoginPayload } from '../types/users.types';
import { hasErrors, validateLoginForm } from '../utils/validation';
import type { FormErrors } from '../utils/validation';

const initialValues: LoginPayload = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const [values, setValues] = useState<LoginPayload>(initialValues);
  const [errors, setErrors] = useState<FormErrors<LoginPayload>>({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const locationState = location.state as
    | { from?: { pathname?: string }; successMessage?: string }
    | null;
  const redirectTo = locationState?.from?.pathname ?? '/dashboard';
  const successMessage = locationState?.successMessage;

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
    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      await login(values);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'No se pudo iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      badge="Bienvenido"
      title="Ingresá a Mi Agenda"
      subtitle="Accedé con tu email y contraseña para continuar con tu dashboard."
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {successMessage ? <div className="alert alert--success">{successMessage}</div> : null}
        {apiError ? <div className="alert alert--error">{apiError}</div> : null}

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
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password}
          onChange={handleChange}
        />

        <button className="button button--primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>

      <p className="auth-link">
        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
