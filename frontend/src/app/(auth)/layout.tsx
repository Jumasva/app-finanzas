// Marco de las pantallas de autenticación. El diseño (panel verde + formulario) llega con los componentes.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
