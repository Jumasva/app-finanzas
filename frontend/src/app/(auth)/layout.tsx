import { AuthHeader } from '@/features/auth/components/AuthHeader';
import { AuthHero } from '@/features/auth/components/AuthHero';

// Marco de las pantallas de autenticación: panel de marca a la izquierda y formulario a la derecha
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // Hero banner
    <div className="flex flex-1 gap-4 lg:p-4">
      <AuthHero />

      {/* Columna del formulario , header : form : footer*/}
      <div className="flex flex-1 flex-col">
        <AuthHeader />

        <main className="flex flex-1 items-center justify-center px-4 py-12 md:px-8">
          <div>
            {children}
          </div>
        </main>

        <footer className="px-4 py-6 text-center text-body-sm text-content-tertiary md:px-8">
            2026 Finanzas · Términos · Privacidad · Ayuda
        </footer>
      </div>
    </div>
  );
}