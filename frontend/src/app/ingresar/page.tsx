'use client';

import { useState } from 'react';
import { Result } from '@/components/Result';
import { api, type ApiResult } from '@/lib/api';

export default function LoginPage() {
  const [result, setResult] = useState<ApiResult | null>(null);

  async function login(formData: FormData) {
    setResult(await api('/auth/login', 'POST', Object.fromEntries(formData)));
  }

  return (
    <main className="max-w-md p-8">
      <h1 className="mb-4 text-xl font-bold">Iniciar sesión</h1>

      <form action={login} className="flex flex-col gap-2">
        <input name="email" placeholder="Correo" className="border p-2" />
        <input name="password" type="password" placeholder="Contraseña" className="border p-2" />
        <button className="border bg-gray-200 p-2">Iniciar sesión</button>
      </form>

      <Result result={result} />
    </main>
  );
}
