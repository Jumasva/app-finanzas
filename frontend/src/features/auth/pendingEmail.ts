'use client';

import { useSyncExternalStore } from 'react';

// Correo que espera verificación: lo guarda el registro (o el login con email_not_verified)
// y lo lee /verifica-tu-correo para mostrarlo y reenviar el enlace.
// Va en sessionStorage y no en la URL: así no queda en el historial ni en los registros del servidor,
// y se borra al cerrar la pestaña
const KEY = 'auth:pending-email';

export function savePendingEmail(email: string) {
  try {
    sessionStorage.setItem(KEY, email);
  } catch {
    // Navegación privada o almacenamiento bloqueado: la pantalla pedirá el correo
  }
}

function readPendingEmail() {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

// En el servidor no hay sessionStorage: devuelve null y el navegador lo lee al hidratar
export function usePendingEmail() {
  return useSyncExternalStore(
    () => () => {},
    readPendingEmail,
    () => null,
  );
}
