'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Result } from '@/components/Result';
import { api, type ApiResult } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [result, setResult] = useState<ApiResult | null>(null);

  async function register(formData: FormData) {
    const response = await api('/auth/register', 'POST', Object.fromEntries(formData));

    // La cuenta queda creada pero sin sesión: primero hay que verificar el correo
    if (response.status === 201) {
      router.push(`/verifica-tu-correo?${new URLSearchParams({ email: String(formData.get('email')) })}`);
      return;
    }

    setResult(response);
  }

  return (
    <main className="max-w-md p-8">
      <h1 className="mb-4 text-xl font-bold">Crear cuenta</h1>

      <form action={register} className="flex flex-col gap-2">
        <input name="name" placeholder="Nombre" className="border p-2" />
        <input name="email" placeholder="Correo" className="border p-2" />
        <input name="password" type="password" placeholder="Contraseña" className="border p-2" />
        <input name="password_confirmation" type="password" placeholder="Confirmar contraseña" className="border p-2" />
        <button className="border bg-gray-200 p-2 text-black">Crear cuenta</button>
      </form>

      <Result result={result} />
    </main>
  );
}