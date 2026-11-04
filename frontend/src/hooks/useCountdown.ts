'use client';

import { useEffect, useState } from 'react';

// Cuenta regresiva en segundos: start(60) arranca y seconds baja hasta 0.
// Se usa para el bloqueo de 429 (Retry-After) y para «Reenviar el enlace en 0:58»
export function useCountdown() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((current) => current - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  return { seconds, running: seconds > 0, start: setSeconds };
}
