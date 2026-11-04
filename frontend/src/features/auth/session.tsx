'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from '@/components/ui/atoms/Alert';
import { Spinner } from '@/components/ui/atoms/Spinner';
import { getMe, type User } from '@/features/auth/api';
import { ApiError } from '@/lib/api';

const SessionContext = createContext<User | null>(null);

/* ══ SESSIONPROVIDER · guardia de las pantallas con sesión ((app)/layout) ══ */
/* El proxy solo sabe si hay cookie; aquí se confirma con GET /auth/me que la sesión sigue viva.
   401 → api.ts lleva a /ingresar?sesion=expirada · 403 de cuenta → a donde dice el contrato */

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [failed, setFailed] = useState<string>();

  useEffect(() => {
    getMe()
      .then(({ data }) => setUser(data))
      .catch((error: unknown) => {
        // 401 y 403 ya redirigieron; aquí solo llegan 500 o sin conexión
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) return;
        setFailed(error instanceof ApiError ? error.message : undefined);
      });
  }, []);

  if (failed) {
    return (
      <div className="mx-auto max-w-md p-8">
        <Alert variant="error">{failed}</Alert>
      </div>
    );
  }

  // Mientras se confirma la sesión, la app queda oculta detrás del spinner.
  // Se renderiza igual (hidden) y no se quita: Next valida la navegación instantánea (cacheComponents)
  // y marca error si una página no se renderiza. Los datos no se filtran: cada pantalla los pide a la API,
  // que responde 401 sin sesión
  return (
    <SessionContext.Provider value={user}>
      {!user && (
        <div className="grid min-h-screen place-items-center">
          <Spinner size={32} label="Cargando tu sesión" />
        </div>
      )}
      <div hidden={!user}>{children}</div>
    </SessionContext.Provider>
  );
}

// El usuario con sesión, para cualquier pantalla de la app (nombre en la topbar, moneda…).
// null solo el primer instante, mientras /auth/me responde (en ese momento la pantalla está oculta)
export function useSession() {
  return useContext(SessionContext);
}
