import { Suspense } from 'react';
import { ResendVerificationEmail } from './ResendVerificationEmail';

// Se llega aquí al crear la cuenta o al intentar entrar sin haber verificado el correo
export default function CheckYourEmailPage() {
  return (
    <main className="max-w-md p-8">
      <h1 className="mb-4 text-xl font-bold">Revisa tu correo</h1>

      <Suspense fallback={<p>Cargando…</p>}>
        <ResendVerificationEmail />
      </Suspense>
    </main>
  );
}
