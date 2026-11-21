import type { Metadata } from 'next';
import { ProfileView } from '@/features/profile/components/ProfileView';

export const metadata: Metadata = { title: 'Mi perfil · Finanzas' };

// Consultar y actualizar el nombre y el correo (RF-COACP)
export default function PerfilPage() {

  console.log(metadata)
  return (
      <ProfileView />
  );
}
