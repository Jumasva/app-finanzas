import { Suspense } from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';

// LoginForm lee ?sesion=expirada: va dentro de <Suspense> (Next lo exige para useSearchParams)
export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
