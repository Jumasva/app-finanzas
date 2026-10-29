import { Suspense } from 'react';
import { ReactivateAccountForms } from './ReactivateAccountForms';

// Sin token: pedir el enlace. Con token (desde el correo): /reactivar-cuenta?token=…&email=…
export default function ReactivateAccountPage() {
  return (
    <main className="max-w-md p-8">
      <h1 className="mb-4 text-xl font-bold">Reactivar cuenta</h1>

      <Suspense fallback={<p>Cargando…</p>}>
        <ReactivateAccountForms />
      </Suspense>
    </main>
  );
}
