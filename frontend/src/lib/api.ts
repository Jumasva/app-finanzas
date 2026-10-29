// Cliente HTTP único: envía las cookies, el token CSRF y los encabezados del contrato de API v1
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiResult<T = unknown> = {
  status: number;
  data: T;
};

// Lee una cookie del navegador
function readCookie(name: string): string | null {
  const cookie = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
}

// Paso 1 del flujo de Sanctum: pedir la cookie CSRF si todavía no existe
async function ensureCsrfCookie(): Promise<void> {
  if (!readCookie('XSRF-TOKEN')) {
    await fetch(`${API_URL}/sanctum/csrf-cookie`, { credentials: 'include' });
  }
}

export async function api<T = unknown>(path: string, method = 'GET', body?: unknown): Promise<ApiResult<T>> {
  // Las peticiones que cambian algo necesitan el token CSRF
  if (method !== 'GET') {
    await ensureCsrfCookie();
  }

  const response = await fetch(`${API_URL}/api/v1${path}`, {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...(method !== 'GET' && { 'X-XSRF-TOKEN': readCookie('XSRF-TOKEN') ?? '' }),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // 204 no trae cuerpo (logout, deactivate)
  const data = response.status === 204 ? null : await response.json();

  return { status: response.status, data: data as T };
}