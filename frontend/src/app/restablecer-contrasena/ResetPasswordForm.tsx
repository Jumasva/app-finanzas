'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Result } from '@/components/Result';
import { api, type ApiResult } from '@/lib/api';

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ApiResult | null>(null);

  async function resetPassword(formData: FormData) {
    setResult(await api('/auth/reset-password', 'POST', Object.fromEntries(formData)));
  }

  return (
    <>
      <form action={resetPassword} className="flex flex-col gap-2">
        <input type="hidden" name="token" value={searchParams.get('token') ?? ''} />
        <input name="email" defaultValue={searchParams.get('email') ?? ''} readOnly className="border bg-gray-100 p-2" />
        <input name="password" type="password" placeholder="Contraseña nueva" className="border p-2" />
        <input name="password_confirmation" type="password" placeholder="Confirmar contraseña nueva" className="border p-2" />
        <button className="border bg-gray-200 p-2 text-black">Guardar contraseña</button>
      </form>

      <Result result={result} />
    </>
  );
}
