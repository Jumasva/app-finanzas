// Llamadas del perfil y los ajustes de la cuenta (CONTRATO DE API v1 · Módulo 1).
// No hay GET /profile: el perfil completo es el User de GET /auth/me, que ya tiene la sesión
import type { User } from '@/features/auth/api';
import { api } from '@/lib/api';

// Recurso Currency del contrato
export type Currency = { code: User['currency_code']; name: string };

// 200 con el User actualizado. Solo se envía lo que cambió. Si cambia el correo, email_verified_at queda
// vacío y llega un enlace al correo nuevo (RF-VECOR-064). 422 si el formato no sirve o el correo ya existe
export function updateProfile(data: { name?: string; email?: string }) {
  return api<{ data: User }>('/profile', { method: 'PATCH', body: data });
}

// 200 con un mensaje. Cierra las demás sesiones y mantiene la actual.
// 422 si la actual es incorrecta, o la nueva es igual a la actual o no cumple la política
export function updatePassword(data: { current_password: string; password: string; password_confirmation: string }) {
  return api<{ message: string }>('/profile/password', { method: 'PATCH', body: data });
}

// 200 con el User actualizado. No convierte ningún monto (COPRE-042). 422 si el código no está en la lista
export function updatePreferences(currencyCode: User['currency_code']) {
  return api<{ data: User }>('/profile/preferences', { method: 'PATCH', body: { currency_code: currencyCode } });
}

// 200 con las monedas disponibles. La lista vive solo en el backend
export function listCurrencies() {
  return api<{ data: Currency[] }>('/currencies');
}
