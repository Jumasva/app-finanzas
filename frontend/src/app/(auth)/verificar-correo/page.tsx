import { Suspense } from 'react';
import { VerifyEmailForm } from '@/features/auth/components/VerifyEmailForm';

// El formulario lee ?token=…&email=… del enlace del correo: esos datos solo existen en el navegador,
// así que va dentro de <Suspense> (Next lo exige para useSearchParams)
export default function VerificarCorreoPage() {
  return (
    <Suspense>
      <VerifyEmailForm />
    </Suspense>
  );
}
