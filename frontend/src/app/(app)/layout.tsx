// src/app/(app)/layout.tsx
// Marco de la app con sesión. Aquí irán la barra lateral y la barra superior (O01, O02).
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
