import { Suspense } from 'react';
import { ResetPasswordForm } from './ResetPasswordForm';

// Se llega aquí desde el enlace del correo: /restablecer-contrasena?token=…&email=…
export default function ResetPasswordPage() {
  return (
    <main className="max-w-md p-8">
      <h1 className="mb-4 text-xl font-bold">Restablecer contraseña</h1>

      {/* El formulario lee la URL, así que se dibuja en el navegador dentro de Suspense */}
      <Suspense fallback={<p>Cargando…</p>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
