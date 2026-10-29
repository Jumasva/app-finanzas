'use client';

import { useState } from 'react';
import { Result } from '@/components/Result';
import { api, type ApiResult } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [result, setResult] = useState<ApiResult | null>(null);

  async function requestLink(formData: FormData) {
    setResult(await api('/auth/forgot-password', 'POST', Object.fromEntries(formData)));
  }

  return (
    <main className="max-w-md p-8">
      <h1 className="mb-4 text-xl font-bold">Olvidé mi contraseña</h1>

      <form action={requestLink} className="flex flex-col gap-2">
        <input name="email" placeholder="Correo" className="border p-2" />
        <button className="border bg-gray-200 p-2">Enviar enlace</button>
      </form>

      <p className="mt-4 text-sm">El correo llega a Mailpit: http://localhost:8025</p>

      <Result result={result} />
    </main>
  );
}
