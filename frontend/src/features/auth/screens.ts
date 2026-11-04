// Tipados
// Lo que cambia en cada pantalla de autenticación según la URL: el panel de marca, el header y el título del formulario
export type AuthHeroContent = {
  image: string;
  title: string;
  text: string;
};

// Dos formas de header: una pregunta con botón, o un enlace para volver
export type AuthHeaderContent =
  { kind: 'cta'; question: string; label: string; href: string } | { kind: 'back'; label: string; href: string };

// Estados del título del formulario. Cada pantalla usa solo los que tiene:
// initial al entrar · sent cuando se envió el correo · done cuando el enlace funcionó · expired cuando venció
export type AuthFormState = 'initial' | 'sent' | 'done' | 'expired';

// Overline, título y descripción encima del formulario
export type AuthFormContent = {
  overline: string;
  title: string;
  // {email} se reemplaza por el correo en negrita (AuthFormHeader)
  description: string;
  // Enlace vencido: overline en ámbar
  tone?: 'warning';
};

export type AuthScreen = {
  hero: AuthHeroContent;
  header: AuthHeaderContent;
  // initial es obligatorio; los demás estados solo si la pantalla los tiene
  form: { initial: AuthFormContent } & Partial<Record<AuthFormState, AuthFormContent>>;
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
  text: 'Cuidamos el acceso a tu información para que solo tú puedas entrar.',
};

/* ══ HEADERS ══ */

const backToLogin: AuthHeaderContent = { kind: 'back', label: 'Volver a iniciar sesión', href: '/ingresar' };

/* ══ FORM HEADERS COMPARTIDOS ══ */

// Los tres flujos con enlace (verificar correo, restablecer contraseña, reactivar cuenta) usan el mismo mensaje
const expiredLink: AuthFormContent = {
  overline: 'Enlace vencido',
  title: 'Este enlace ya no sirve',
  description: 'El enlace no es válido o ya venció. Pide uno nuevo y úsalo antes de que caduque.',
  tone: 'warning',
};

// Lo que se ve después de pedir un enlace: olvidé mi contraseña y reactivar cuenta
function linkSent(description: string): AuthFormContent {
  return { overline: 'Revisa tu correo', title: 'Te enviamos un enlace', description };
}

/* ══ PANTALLAS ══ */

export const authScreens: Record<string, AuthScreen> = {
  '/ingresar': {
    hero: login,
    header: { kind: 'cta', question: '¿Nuevo en Finanzas?', label: 'Crear cuenta', href: '/registro' },
    form: {
      initial: {
        overline: 'Bienvenido de nuevo',
        title: 'Iniciar sesión',
        description: 'Ingresa con tu correo para ver tus finanzas.',
      },
    },
  },

  '/registro': {
    hero: registro(1),
    header: { kind: 'cta', question: '¿Ya tienes cuenta?', label: 'Iniciar sesión', href: '/ingresar' },
    form: {
      initial: {
        overline: 'Crear cuenta',
        title: 'Crea tu cuenta',
        description: 'Es gratis. Solo necesitas tu nombre, correo y una contraseña.',
      },
    },
  },

  // Después del registro: pide abrir el correo. Reenviar cambia el cuerpo, no el título
  '/verifica-tu-correo': {
    hero: registro(2),
    header: backToLogin,
    form: {
      initial: {
        overline: 'Un paso más',
        title: 'Revisa tu correo',
        description: 'Ábrelo y toca el enlace para verificar tu correo. Después podrás iniciar sesión.',
      },
    },
  },

  // La que abre el enlace del correo
  '/verificar-correo': {
    hero: registro(3),
    header: backToLogin,
    form: {
      initial: {
        overline: 'Verificación',
        title: 'Confirma tu correo',
        description: 'Toca el botón para terminar de crear tu cuenta.',
      },
      done: {
        overline: '¡Listo!',
        title: 'Verificamos tu correo',
        description: 'Ya puedes iniciar sesión y empezar a registrar tus movimientos.',
      },
      expired: expiredLink,
    },
  },

  '/olvide-contrasena': {
    hero: seguridad,
    header: backToLogin,
    form: {
      initial: {
        overline: 'Recuperar acceso',
        title: '¿Olvidaste tu contraseña?',
        description: 'Escribe el correo de tu cuenta y te enviamos un enlace para crear una nueva.',
      },
      sent: linkSent('Si existe una cuenta activa con {email}, te llegará un correo para restablecer tu contraseña.'),
    },
  },

  // La que abre el enlace del correo
  '/restablecer-contrasena': {
    hero: seguridad,
    header: backToLogin,
    form: {
      initial: {
        overline: 'Recuperar acceso',
        title: 'Crea una contraseña nueva',
        description: 'Para la cuenta {email}. Al guardarla, se cierran tus sesiones abiertas.',
      },
      done: {
        overline: '¡Listo!',
        title: 'Actualizamos tu contraseña',
        description: 'Inicia sesión con la nueva contraseña.',
      },
      expired: expiredLink,
    },
  },

  '/reactiva-tu-cuenta': {
    hero: seguridad,
    header: backToLogin,
    form: {
      initial: {
        overline: 'Reactivar cuenta',
        title: 'Vuelve a tu cuenta',
        description:
          'Si desactivaste tu cuenta, te enviamos un enlace para reactivarla. Toda tu información se conservó.',
      },
      sent: linkSent(
        'Si existe una cuenta inactiva con {email}, te llegará un correo para reactivarla. El enlace vale 60 minutos.',
      ),
    },
  },

  // La que abre el enlace del correo
  '/reactivar-cuenta': {
    hero: seguridad,
    header: backToLogin,
    form: {
      initial: {
        overline: 'Reactivar cuenta',
        title: 'Reactiva tu cuenta',
        description: 'Toda tu información se conservó: movimientos, presupuestos y metas.',
      },
      done: {
        overline: '¡Bienvenido de vuelta!',
        title: 'Reactivamos tu cuenta',
        description: 'Inicia sesión para continuar donde lo dejaste.',
      },
      expired: expiredLink,
    },
  },
};

// Si se crea una ruta nueva en (auth) y se olvida agregarla aquí, se usa la del login
export const defaultAuthScreen = authScreens['/ingresar'];
