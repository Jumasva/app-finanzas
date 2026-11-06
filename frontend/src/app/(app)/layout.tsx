import { MobileNav } from '@/components/ui/organisms/MobileNav';
import { Sidebar } from '@/components/ui/organisms/Sidebar';
import { SessionProvider } from '@/features/auth/session';

// Marco de la app con sesión: Sidebar a la izquierda desde lg (O01) y, por debajo, la barra con el cajón.
// Aquí irá también la barra superior (O02).
// SessionProvider confirma la sesión con /auth/me antes de mostrar cualquier pantalla
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <MobileNav />
        <Sidebar />
        {/* min-w-0: sin esto, una tabla ancha empujaría el contenido por debajo del Sidebar */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </SessionProvider>
  );
}
