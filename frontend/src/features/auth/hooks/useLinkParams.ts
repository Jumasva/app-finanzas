'use client';

import { useSearchParams } from 'next/navigation';

// Lee ?token=…&email=… del enlace que llega al correo (verificar, restablecer, reactivar).
// Devuelve null si falta alguno: la pantalla lo trata como enlace vencido.
// Quien lo use debe estar dentro de <Suspense>, porque los parámetros solo existen en el navegador
export function useLinkParams() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  return token && email ? { token, email } : null;
}
