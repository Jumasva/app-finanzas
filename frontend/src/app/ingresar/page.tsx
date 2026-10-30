'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Result } from '@/components/Result';
import { api, type ApiResult } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [result, setResult] = useState<ApiResult<{ code?: string }> | null>(null);

  async function login(formData: FormData) {
    const response = await api<{ code?: string }>('/auth/login', 'POST', Object.fromEntries(formData));

    // Contraseña correcta, pero el correo no está verificado: no hay sesión
    if (response.data?.code === 'email_not_verified') {
      router.push(`/verifica-tu-correo?${new URLSearchParams({ email: String(formData.get('email')) })}`);
      return;
    }

    setResult(response);
  }

  return (
    <main className="max-w-md p-8">
      <h1 className="mb-4 text-xl font-bold">Iniciar sesión</h1>

      <form action={login} className="flex flex-col gap-2">
        <input name="email" placeholder="Correo" className="border p-2" />
        <input name="password" type="password" placeholder="Contraseña" className="border p-2" />
        <button className="border bg-gray-200 p-2 text-black">Iniciar sesión</button>
      </form>

      <Result result={result} />
    </main>
  );
}
