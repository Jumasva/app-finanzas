import type { Metadata } from 'next';
import { UserIcon } from '@/components/ui/atoms/icons';
import { ComingSoon } from '@/features/navigation/components/ComingSoon';

export const metadata: Metadata = { title: 'Mi perfil · Finanzas' };

// Provisional hasta construir el perfil (RF-COACP: consultar y actualizar nombre y correo)
export default function PerfilPage() {
  return <ComingSoon icon={UserIcon} description="Aquí consultarás y cambiarás tu nombre y tu correo." />;
}
