import { usePathname } from 'next/navigation';
import { authScreens, defaultAuthScreen } from '@/features/auth/screens';

// Devuelve el contenido de la pantalla de autenticación actual según la URL
export function useAuthScreen() {
  const pathname = usePathname();

  return authScreens[pathname] ?? defaultAuthScreen;
}
