import { Suspense } from 'react';
import { VerifyEmailButton } from './VerifyEmailButton';

// Se llega aquí desde el enlace del correo: /verificar-correo?token=…&email=…
export default function VerifyEmailPage() {
  return (
    <main className="max-w-md p-8">
      <h1 className="mb-4 text-xl font-bold">Verificar correo</h1>

      <Suspense fallback={<p>Cargando…</p>}>
        <VerifyEmailButton />
      </Suspense>
    </main>
  );
}
