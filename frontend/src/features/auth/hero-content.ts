
// contenido del banner imagen, titulo y texto, para cada ruta de autenticación
export type AuthHeroContent = {
  image: string;
  title: string;
  text: string;
};

const login: AuthHeroContent = {
  image: '/banner_auth/login.svg',
  title: 'Tu dinero, claro\ny en orden.',
  text: 'Registra tus gastos en segundos, pon límites por categoría y mira cómo crecen tus ahorros mes a mes.',
};

function registro(step: 1 | 2 | 3): AuthHeroContent {
  return {
    image: `/banner_auth/registro_step${step}.svg`,
    title: 'Empieza a ordenar\ntus finanzas hoy.',
    text: 'TODO: copiar la frase de Figma',
  };
}

const seguridad: AuthHeroContent = {
  image: '/banner_auth/seguridad.svg',
  title: 'Tu cuenta,\nprotegida.',
  text: 'TODO: copiar la frase de Figma',
};

export const authHeroes: Record<string, AuthHeroContent> = {
  '/ingresar': login,
  '/registro': registro(1),
  '/verifica-tu-correo': registro(2),
  '/verificar-correo': registro(3),
  '/olvide-contrasena': seguridad,
  '/restablecer-contrasena': seguridad,
  '/reactivar-cuenta': seguridad,
};

export const defaultAuthHero = login;