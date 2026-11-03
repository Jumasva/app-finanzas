import Image from 'next/image';

// Marco de las pantallas de autenticación: panel de marca a la izquierda y formulario a la derecha
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 gap-4 lg:p-4">
      {/* Panel de marca: solo desktop. Por ahora siempre muestra la variante del login */}
      <aside className="hidden w-[38%] flex-col gap-10 overflow-hidden rounded-[28px] bg-auth-hero p-12 lg:sticky lg:top-4 lg:flex lg:h-[calc(100vh-2rem)]">
        {/* Logo arriba */}
        <Image src="/logo/logo_horizontal_blanco.svg" alt="Finanzas" width={130} height={36} />

        {/* Ilustración: ocupa el alto que sobra, pegada arriba; si falta espacio se achica */}
        <div className="relative mt-10 min-h-0 flex-1 [@media(max-height:800px)]:mt-0">
          <Image src="/banner_auth/imagen_login.svg" alt="" fill className="object-contain object-top" />
        </div>

        {/* Mensaje abajo: texto real, nunca se recorta */}
        <div className="flex flex-col gap-3">
          <p className="font-heading text-display text-content-inverse">
            Tu dinero, claro <br />y en orden.
          </p>
          <p className="text-body-lg text-navy-200">
            Registra tus gastos en segundos, pon límites por categoría y mira cómo crecen tus ahorros mes a mes.
          </p>
        </div>
      </aside>

      {/* Columna del formulario */}
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 items-center justify-center px-4 py-12 md:px-8">
          <div className="w-full max-w-[400px]">{children}</div>
        </main>

        <footer className="px-4 py-6 text-center text-body-sm text-content-tertiary md:px-8">
          2026 Finanzas · Términos · Privacidad · Ayuda
        </footer>
      </div>
    </div>
  );
}
