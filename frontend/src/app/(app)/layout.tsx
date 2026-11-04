import { SessionProvider } from '@/features/auth/session';

// Marco de la app con sesión. Aquí irán la barra lateral y la barra superior (O01, O02).
// SessionProvider confirma la sesión con /auth/me antes de mostrar cualquier pantalla
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <main className="min-h-screen">{children}</main>
    </SessionProvider>
  );
}
