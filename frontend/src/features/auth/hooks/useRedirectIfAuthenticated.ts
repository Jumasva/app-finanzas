'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMe } from '@/features/auth/api';

// En /ingresar y /registro: si ya hay sesión, no tiene sentido mostrar el formulario → a /inicio.
// No se hace en el proxy porque la cookie puede existir con la sesión vencida, y eso haría un ciclo
// (/ingresar → /inicio → 401 → /ingresar…). /auth/me sí sabe si la sesión sirve.
// Solo en esas dos pantallas: las de enlaces (restablecer, verificar) deben funcionar aunque haya sesión
export function useRedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    getMe({ handleSession: false })
      .then(() => router.replace('/inicio'))
      .catch(() => {
        // 401: no hay sesión, se queda en el formulario
      });
  }, [router]);
}
