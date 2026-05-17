export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message?: string;
  id?: number;
  user: AuthUser;
}

export interface LoginResponse {
  token: string;
  user?: AuthUser;
}

export interface MeResponse {
  user: AuthUser;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  ok?: boolean;
}
