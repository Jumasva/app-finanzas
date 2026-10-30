'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Result } from '@/components/Result';
import { api, type ApiResult } from '@/lib/api';

export function VerifyEmailButton() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ApiResult | null>(null);

  async function verify() {
    setResult(await api('/auth/verify-email', 'POST', {
      token: searchParams.get('token'),
      email: searchParams.get('email'),
    }));
  }

  return (
    <>
      <button onClick={verify} className="border bg-gray-200 p-2 text-black">
        Verificar {searchParams.get('email')}
      </button>

      <Result result={result} />

      {result?.status === 200 && (
        <Link href="/ingresar" className="mt-4 block text-blue-700 underline">
          Iniciar sesión
        </Link>
      )}
    </>
  );
}
