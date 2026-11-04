// Llamadas de autenticación (CONTRATO DE API v1 · Módulo 1)
import { api } from '@/lib/api';

// Recurso User del contrato
export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  currency_code: 'COP' | 'USD' | 'EUR';
  status: 'active' | 'inactive';
  created_at: string;
};

// Las respuestas que solo confirman algo traen un mensaje para el usuario
type MessageResponse = { message: string };

// Lo que llega en el enlace del correo: ?token=…&email=…
export type LinkParams = { token: string; email: string };

/* ══ SESIÓN ══ */

// 200 con el User y la cookie de sesión. Errores: 422, 429 y 403 email_not_verified
export function login(data: { email: string; password: string }) {
  // handleSession: false → el 403 email_not_verified lo maneja el LoginForm (guarda el correo antes de ir)
  return api<{ data: User }>('/auth/login', { method: 'POST', body: data, handleSession: false });
}

// 200 con el User si hay sesión, 401 si no. handleSession decide si un 401 lleva al login (guardia de la app)
// o solo se informa (las pantallas de login y registro, para saber si ya hay sesión)
export function getMe({ handleSession = true } = {}) {
  return api<{ data: User }>('/auth/me', { handleSession });
}

/* ══ REGISTRO Y VERIFICACIÓN DEL CORREO ══ */

// 201 con el User. No inicia sesión: se envía el enlace para verificar el correo
export function register(data: { name: string; email: string; password: string; password_confirmation: string }) {
  return api<{ data: User }>('/auth/register', { method: 'POST', body: data });
}

// Siempre 200 con el mismo mensaje. 429 si se repite antes de tiempo
export function resendVerification(email: string) {
  return api<MessageResponse>('/auth/verification-email', { method: 'POST', body: { email } });
}

// 200. 422 (errors.token) si el enlace venció, ya se usó o el correo ya estaba verificado
export function verifyEmail(params: LinkParams) {
  return api<MessageResponse>('/auth/verify-email', { method: 'POST', body: params });
}

/* ══ CONTRASEÑA ══ */

// Siempre 200 con el mismo mensaje. 429 si se repite antes de 60 segundos
export function forgotPassword(email: string) {
  return api<MessageResponse>('/auth/forgot-password', { method: 'POST', body: { email } });
}

// 200. Cierra todas las sesiones. 422 (errors.token) si el enlace venció, o por la política de contraseña
export function resetPassword(data: LinkParams & { password: string; password_confirmation: string }) {
  return api<MessageResponse>('/auth/reset-password', { method: 'POST', body: data });
}

/* ══ REACTIVAR CUENTA ══ */

// Siempre 200 con un mensaje genérico. 429 si se superan los intentos
export function requestReactivation(email: string) {
  return api<MessageResponse>('/account/reactivation-request', { method: 'POST', body: { email } });
}

// 200. 422 (errors.token) si el enlace venció o ya se usó
export function reactivateAccount(params: LinkParams) {
  return api<MessageResponse>('/account/reactivate', { method: 'POST', body: params });
}

/* ══ SESIÓN Y CUENTA (privadas) ══ */

// 204. Invalida la sesión y regenera el token CSRF
export function logout() {
  return api<null>('/auth/logout', { method: 'POST' });
}

// 204. La cuenta pasa a inactiva y se cierran todas sus sesiones. 422 si la contraseña es incorrecta
export function deactivateAccount(password: string) {
  return api<null>('/account/deactivate', { method: 'POST', body: { password } });
}
