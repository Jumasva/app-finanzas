'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Result } from '@/components/Result';
import { api, type ApiResult } from '@/lib/api';

export function ResendVerificationEmail() {
  const email = useSearchParams().get('email') ?? '';
  const [result, setResult] = useState<ApiResult | null>(null);

  async function resend() {
    setResult(await api('/auth/verification-email', 'POST', { email }));
  }

  return (
    <>
      <p className="mb-4">
        Te enviamos un enlace a <strong>{email}</strong>. Ábrelo para verificar tu correo; después podrás iniciar sesión.
      </p>
      <p className="mb-4 text-sm">En desarrollo, el correo llega a Mailpit: http://localhost:8025</p>

      <div className="flex gap-2">
        <button onClick={resend} className="border bg-gray-200 p-2 text-black">
          Reenviar el enlace
        </button>
        <Link href="/ingresar" className="border p-2">
          Ya lo verifiqué: iniciar sesión
        </Link>
      </div>

      <Result result={result} />
    </>
  );
}
