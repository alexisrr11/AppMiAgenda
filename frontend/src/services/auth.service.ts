import type {
  ApiErrorResponse,
  AuthSession,
  LoginPayload,
  LoginResponse,
  MeResponse,
  RegisterPayload,
  RegisterResponse,
} from '../types/users.types';
import { clearAuthStorage, getStoredToken, saveToken, saveUser } from '../utils/storage';

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL:", API_URL);
console.log(import.meta.env);

const parseApiError = async (response: Response) => {
  try {
    const data = (await response.json()) as ApiErrorResponse;
    return data.message || data.error || 'Ocurrió un error al procesar la solicitud.';
  } catch {
    return 'Ocurrió un error al procesar la solicitud.';
  }
};

const request = async <TResponse>(path: string, body: unknown): Promise<TResponse> => {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<TResponse>;
};

const authenticatedRequest = async <TResponse>(path: string, token: string): Promise<TResponse> => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<TResponse>;
};

export const register = (payload: RegisterPayload) => {
  return request<RegisterResponse>('/auth/register', payload);
};

export const getCurrentUser = async (token = getStoredToken()) => {
  if (!token) {
    throw new Error('Token requerido.');
  }

  const response = await authenticatedRequest<MeResponse>('/auth/me', token);
  saveUser(response.user);
  return response.user;
};

export const login = async (payload: LoginPayload): Promise<AuthSession> => {
  const response = await request<LoginResponse>('/auth/login', payload);

  saveToken(response.token);
  const user = await getCurrentUser(response.token);

  return {
    token: response.token,
    user,
  };
};

export const logout = () => {
  clearAuthStorage();
};

export const getToken = () => getStoredToken();

export { API_URL };
