import { Sidebar } from '@/components/ui/organisms/Sidebar';
import { Topbar } from '@/components/ui/organisms/Topbar';
import { SessionProvider } from '@/features/auth/session';

// Marco de la app con sesión: Sidebar a la izquierda desde lg (O01) y la Topbar arriba del contenido (O02).
// En móvil y tablet el Sidebar no se ve: la Topbar trae el botón que lo abre como cajón.
// SessionProvider confirma la sesión con /auth/me antes de mostrar cualquier pantalla
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        {/* min-w-0: sin esto, una tabla ancha empujaría el contenido por debajo del Sidebar */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
