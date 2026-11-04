import { NextResponse, type NextRequest } from 'next/server';

// Cookie de sesión de Laravel: Str::slug(APP_NAME) + '-session' (backend/config/session.php).
// Es HttpOnly: el navegador la manda también a localhost:3000 porque las cookies no distinguen puertos
const SESSION_COOKIE = 'app-finanzas-session';

// Rutas que se pueden ver sin sesión. Todo lo demás es de la app y la necesita
const PUBLIC_ROUTES = [
  '/',
  '/ingresar',
  '/registro',
  '/verifica-tu-correo',
  '/verificar-correo',
  '/olvide-contrasena',
  '/restablecer-contrasena',
  '/reactiva-tu-cuenta',
  '/reactivar-cuenta',
];

// Revisión optimista (lo que recomienda Next para Proxy): solo mira si existe la cookie, sin llamar a la API,
// porque Proxy corre en cada navegación y en cada prefetch. Si la cookie existe pero la sesión ya venció,
// la guardia de (app) lo descubre con /auth/me y lleva a /ingresar?sesion=expirada
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_ROUTES.includes(pathname) || pathname.startsWith('/design-system');

  if (!isPublic && !request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL('/ingresar', request.url));
  }

  return NextResponse.next();
}

// No corre en archivos internos de Next ni en los de public/ (imágenes, svg, favicon)
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)'],
};
