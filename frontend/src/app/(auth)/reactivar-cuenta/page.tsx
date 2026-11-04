import { Suspense } from 'react';
import { ReactivateForm } from '@/features/auth/components/ReactivateForm';

// El formulario lee ?token=…&email=… del enlace del correo: esos datos solo existen en el navegador,
// así que va dentro de <Suspense> (Next lo exige para useSearchParams)
export default function ReactivarCuentaPage() {
  return (
    <Suspense>
      <ReactivateForm />
    </Suspense>
  );
}
