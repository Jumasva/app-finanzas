'use client';

import { useState } from 'react';
import { logout } from '@/features/auth/api';
import { ApiError } from '@/lib/api';

/* ══ USELOGOUT · cierre de sesión (RF-CIESE) · POST /auth/logout → 204 ══ */

export function useLogout() {
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState<string>();

  async function handleLogout() {
    setLoggingOut(true);
    setError(undefined);

    try {
      await logout();
    } catch (err) {
      // 401: la sesión ya había vencido, así que el resultado es el mismo. Otro error (500, sin conexión):
      // la sesión sigue abierta en el servidor, se avisa y no se sale
      if (!(err instanceof ApiError && err.status === 401)) {
        setError(err instanceof ApiError ? err.message : 'No pudimos cerrar tu sesión. Inténtalo de nuevo.');
        setLoggingOut(false);
        return;
      }
    }

    // replace y no router.push: descarta el estado de la app y «atrás» no vuelve a una pantalla privada
    window.location.replace('/ingresar');
  }

  return { loggingOut, error, logout: handleLogout };
}
