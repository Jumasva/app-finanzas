'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Result } from '@/components/Result';
import { api, type ApiResult } from '@/lib/api';

export function ReactivateAccountForms() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [result, setResult] = useState<ApiResult | null>(null);

  async function requestLink(formData: FormData) {
    setResult(await api('/account/reactivation-request', 'POST', Object.fromEntries(formData)));
  }

  async function reactivate() {
    setResult(await api('/account/reactivate', 'POST', { token, email: searchParams.get('email') }));
  }

  return (
    <>
      {token ? (
        <button onClick={reactivate} className="border bg-gray-200 p-2">
          Reactivar {searchParams.get('email')}
        </button>
      ) : (
        <form action={requestLink} className="flex flex-col gap-2">
          <input name="email" placeholder="Correo de la cuenta inactiva" className="border p-2" />
          <button className="border bg-gray-200 p-2">Enviar enlace</button>
        </form>
      )}

      <Result result={result} />
    </>
  );
}
