import Link from 'next/link';

const pages = [
  ['/registro', 'Crear cuenta'],
  ['/ingresar', 'Iniciar sesión'],
  ['/cuenta', 'Mi cuenta'],
  ['/olvide-contrasena', 'Olvidé mi contraseña'],
  ['/reactivar-cuenta', 'Reactivar cuenta'],
];

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="mb-4 text-xl font-bold">App Finanzas · pantallas de prueba</h1>

      <ul className="list-disc pl-6">
        {pages.map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="text-blue-700 underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}