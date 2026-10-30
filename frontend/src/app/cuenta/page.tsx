'use client';

import { useState } from 'react';
import { Result } from '@/components/Result';
import { api, type ApiResult } from '@/lib/api';

export default function AccountPage() {
  const [result, setResult] = useState<ApiResult | null>(null);

  // Cada formulario envía sus campos a su endpoint y muestra la respuesta abajo
  function sendTo(path: string, method: string) {
    return async (formData: FormData) => {
      setResult(await api(path, method, Object.fromEntries(formData)));
    };
  }

  return (
    <main className="flex max-w-md flex-col gap-6 p-8">
      <h1 className="text-xl font-bold">Mi cuenta</h1>

      <section className="flex flex-wrap gap-2">
        <button onClick={async () => setResult(await api('/auth/me'))} className="border bg-gray-200 p-2 text-black">
          ¿Quién soy?
        </button>
        <button onClick={async () => setResult(await api('/currencies'))} className="border bg-gray-200 p-2 text-black">
          Ver monedas
        </button>
        <button onClick={async () => setResult(await api('/auth/logout', 'POST'))} className="border bg-gray-200 p-2 text-black">
          Cerrar sesión
        </button>
      </section>

      <form action={sendTo('/profile', 'PATCH')} className="flex flex-col gap-2">
        <h2 className="font-bold">Nombre y correo</h2>
        <input name="name" placeholder="Nombre" className="border p-2" />
        <input name="email" placeholder="Correo" className="border p-2" />
        <button className="border bg-gray-200 p-2 text-black">Guardar</button>
      </form>

      <form action={sendTo('/profile/password', 'PATCH')} className="flex flex-col gap-2">
        <h2 className="font-bold">Cambiar contraseña</h2>
        <input name="current_password" type="password" placeholder="Contraseña actual" className="border p-2" />
        <input name="password" type="password" placeholder="Contraseña nueva" className="border p-2" />
        <input name="password_confirmation" type="password" placeholder="Confirmar contraseña nueva" className="border p-2" />
        <button className="border bg-gray-200 p-2 text-black">Cambiar contraseña</button>
      </form>

      <form action={sendTo('/profile/preferences', 'PATCH')} className="flex flex-col gap-2">
        <h2 className="font-bold">Moneda principal</h2>
        <input name="currency_code" placeholder="COP, USD o EUR" className="border p-2" />
        <button className="border bg-gray-200 p-2 text-black">Cambiar moneda</button>
      </form>

      <form action={sendTo('/account/deactivate', 'POST')} className="flex flex-col gap-2">
        <h2 className="font-bold">Desactivar cuenta</h2>
        <input name="password" type="password" placeholder="Contraseña" className="border p-2" />
        <button className="border bg-red-200 p-2 text-black">Desactivar cuenta</button>
      </form>

      <Result result={result} />
    </main>
  );
}
