'use client';

import { useState } from 'react';
import { Result } from '@/components/Result';
import { api, type ApiResult } from '@/lib/api';

export default function RegisterPage() {
  const [result, setResult] = useState<ApiResult | null>(null);

  async function register(formData: FormData) {
    setResult(await api('/auth/register', 'POST', Object.fromEntries(formData)));
  }

  return (
    <main className="max-w-md p-8">
      <h1 className="mb-4 text-xl font-bold">Crear cuenta</h1>

      <form action={register} className="flex flex-col gap-2">
        <input name="name" placeholder="Nombre" className="border p-2" />
        <input name="email" placeholder="Correo" className="border p-2" />
        <input name="password" type="password" placeholder="Contraseña" className="border p-2" />
        <input name="password_confirmation" type="password" placeholder="Confirmar contraseña" className="border p-2" />
        <button className="border bg-gray-200 p-2">Crear cuenta</button>
      </form>

      <Result result={result} />
    </main>
  );
}