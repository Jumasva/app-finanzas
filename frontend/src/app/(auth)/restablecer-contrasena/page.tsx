import { Suspense } from 'react';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';

// El formulario lee ?token=…&email=… del enlace del correo: esos datos solo existen en el navegador,
// así que va dentro de <Suspense> (Next lo exige para useSearchParams)
export default function RestablecerContrasenaPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
