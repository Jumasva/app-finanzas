import { redirect } from 'next/navigation';

// La raíz no tiene contenido propio: manda al login.
// En el paso 5, proxy.ts decidirá entre /ingresar y /inicio según la sesión.
export default function Home() {
  redirect('/ingresar');
}
