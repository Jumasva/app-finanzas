// Cliente HTTP único: envía las cookies, el token CSRF y los encabezados del contrato de API v1
// Si la respuesta es correcta (2xx) devuelve el cuerpo; si no, lanza un ApiError para el formulario
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type ApiOptions = {
  method?: Method;
  body?: unknown;
  // true (por defecto): si la sesión no sirve (401 o 403 de cuenta), lleva a donde dice el contrato.
  // false: la pantalla lo maneja (el login con email_not_verified, o revisar si hay sesión sin redirigir)
  handleSession?: boolean;
};

/* ══ ERRORES ══ */

// Cuerpo de error del contrato: 422 trae errors por campo; 401, 403, 404, 409, 429 y 500 traen code
type ErrorBody = {
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
};

// Mensaje para errores sin cuerpo útil (caída del servidor, red). El contrato pide uno genérico, sin detalles técnicos
const GENERIC_MESSAGE = 'Algo salió mal. Inténtalo de nuevo en unos minutos.';

export class ApiError extends Error {
  // 0 cuando no hubo respuesta (sin conexión o el servidor no responde)
  status: number;
  // Código estable del contrato: email_not_verified, too_many_requests… Se decide con esto, nunca con el texto
  code?: string;
  // Solo en 422: { email: ['…'], password: ['…'] }
  errors: Record<string, string[]>;
  // Solo en 429: segundos que hay que esperar (encabezado Retry-After)
  retryAfter?: number;

  constructor(status: number, body: ErrorBody = {}, retryAfter?: number) {
    super(body.message ?? GENERIC_MESSAGE);
    this.name = 'ApiError';
    this.status = status;
    this.code = body.code;
    this.errors = body.errors ?? {};
    this.retryAfter = retryAfter;
  }

  // Primer mensaje de un campo, listo para el error del FormField
  fieldError(field: string): string | undefined {
    return this.errors[field]?.[0];
  }
}

/* ══ CSRF (flujo de Sanctum) ══ */

// Lee una cookie del navegador. XSRF-TOKEN no es HttpOnly justamente para poder leerla aquí
function readCookie(name: string): string | null {
  const cookie = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
}

// Paso 1: pedir la cookie CSRF. force la pide de nuevo aunque exista (cuando venció: 419)
async function ensureCsrfCookie(force = false): Promise<void> {
  if (force || !readCookie('XSRF-TOKEN')) {
    await fetch(`${API_URL}/sanctum/csrf-cookie`, { credentials: 'include' });
  }
}

/* ══ SESIÓN ══ */

// Qué hace el frontend cuando la sesión no sirve (contrato · Códigos de respuesta).
// window.location y no el router: se sale de la app por completo y no queda nada de la sesión anterior en memoria
function handleSessionError(status: number, code?: string) {
  if (status === 401) {
    // La sesión venció o se cerró (por inactividad, o al cambiar la contraseña): el login muestra el aviso
    window.location.replace('/ingresar?sesion=expirada');
  } else if (status === 403 && code === 'email_not_verified') {
    window.location.replace('/verifica-tu-correo');
  } else if (status === 403 && code === 'account_inactive') {
    window.location.replace('/ingresar');
  }
}

/* ══ PETICIÓN ══ */

async function send(path: string, method: Method, body: unknown): Promise<Response> {
  return fetch(`${API_URL}/api/v1${path}`, {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...(method !== 'GET' && { 'X-XSRF-TOKEN': readCookie('XSRF-TOKEN') ?? '' }),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

// Lee el JSON sin romperse si el cuerpo viene vacío o no es JSON (por ejemplo, un 500 de nginx)
async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function api<T = unknown>(
  path: string,
  { method = 'GET', body, handleSession = true }: ApiOptions = {},
): Promise<T> {
  let response: Response;

  try {
    // Las peticiones que cambian algo necesitan el token CSRF
    if (method !== 'GET') await ensureCsrfCookie();

    response = await send(path, method, body);

    // 419: la cookie CSRF venció. Se pide otra y se reintenta una sola vez
    if (response.status === 419) {
      await ensureCsrfCookie(true);
      response = await send(path, method, body);
    }
  } catch {
    // fetch solo lanza cuando no hubo respuesta: sin conexión o el servidor apagado
    throw new ApiError(0);
  }

  // 204 no trae cuerpo (logout, deactivate)
  if (response.status === 204) return null as T;

  const data = await readJson(response);

  if (!response.ok) {
    const errorBody = (data ?? {}) as ErrorBody;
    if (handleSession) handleSessionError(response.status, errorBody.code);

    const retryAfter = Number(response.headers.get('Retry-After')) || undefined;
    throw new ApiError(response.status, errorBody, retryAfter);
  }

  return data as T;
}
