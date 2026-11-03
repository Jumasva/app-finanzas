// Tipados
// Lo que cambia en cada pantalla de autenticación según la URL: el panel de marca y el header
export type AuthHeroContent = {
  image: string;
  title: string;
  text: string;
};

// Dos formas de header: una pregunta con botón, o un enlace para volver
export type AuthHeaderContent =
  | { kind: 'cta'; question: string; label: string; href: string }
  | { kind: 'back'; label: string; href: string };

export type AuthScreen = {
  hero: AuthHeroContent;
  header: AuthHeaderContent;
};

/* ══ PANELES ══ */

const login: AuthHeroContent = {
  image: '/banner_auth/login.svg',
  title: 'Tu dinero, claro\ny en orden.',
  text: 'Registra tus gastos en segundos, pon límites por categoría y mira cómo crecen tus ahorros mes a mes.',
};

// El registro avanza en 3 pasos: misma frase, distinta imagen
function registro(step: 1 | 2 | 3): AuthHeroContent {
  return {
    image: `/banner_auth/registro_step${step}.svg`,
    title: 'Empieza a ordenar\ntus finanzas hoy.',
    text: 'Una cuenta, todas tus finanzas: ingresos, gastos, presupuestos y metas en un solo lugar.',
  };
}

const seguridad: AuthHeroContent = {
  image: '/banner_auth/seguridad.svg',
  title: 'Tu cuenta,\nprotegida.',
  text: 'TODO: copiar la frase de Figma',
};

/* ══ HEADERS ══ */

const backToLogin: AuthHeaderContent = { kind: 'back', label: 'Volver a iniciar sesión', href: '/ingresar' };

/* ══ PANTALLAS ══ */

export const authScreens: Record<string, AuthScreen> = {
  '/ingresar': {
    hero: login,
    header: { kind: 'cta', question: '¿Nuevo en Finanzas?', label: 'Crear cuenta', href: '/registro' },
  },
  '/registro': {
    hero: registro(1),
    header: { kind: 'cta', question: '¿Ya tienes cuenta?', label: 'Iniciar sesión', href: '/ingresar' },
  },
  '/verifica-tu-correo': { hero: registro(2), header: backToLogin },
  '/verificar-correo': { hero: registro(3), header: backToLogin },
  '/olvide-contrasena': { hero: seguridad, header: backToLogin },
  '/restablecer-contrasena': { hero: seguridad, header: backToLogin },
  '/reactivar-cuenta': { hero: seguridad, header: backToLogin },
};

// Si se crea una ruta nueva en (auth) y se olvida agregarla aquí, se usa la del login
export const defaultAuthScreen = authScreens['/ingresar'];