'use client';

import { useState } from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { ApiError } from '@/lib/api';

export type FormAlert = { variant: 'error' | 'warning' | 'success'; message: string };

// Lo que comparten todos los formularios de auth al llamar a la API:
// el botón cargando, los errores por campo (422), el aviso y el bloqueo con cuenta regresiva (429)
export function useApiForm() {
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});
  const [alert, setAlert] = useState<FormAlert>();
  const wait = useCountdown();

  // onError deja que la pantalla maneje un caso propio (enlace vencido, correo sin verificar).
  // Si devuelve true, ya lo manejó; si no, se aplica la regla general del contrato
  async function run(action: () => Promise<void>, onError?: (error: ApiError) => boolean) {
    setLoading(true);
    setFieldErrors({});
    setAlert(undefined);

    try {
      await action();
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
      if (onError?.(error)) return;

      if (error.status === 422) {
        // 422: el primer error de cada campo, debajo de su FormField
        setFieldErrors(Object.fromEntries(Object.keys(error.errors).map((field) => [field, error.fieldError(field)])));
      } else if (error.status === 429) {
        setAlert({ variant: 'warning', message: error.message });
        wait.start(error.retryAfter ?? 60);
      } else {
        // 500 o sin conexión: mensaje genérico, sin detalles técnicos
        setAlert({ variant: 'error', message: error.message });
      }
    } finally {
      setLoading(false);
    }
  }

  return { loading, fieldErrors, alert, setAlert, wait, run };
}
