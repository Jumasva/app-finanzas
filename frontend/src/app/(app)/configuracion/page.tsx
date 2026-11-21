import type { Metadata } from 'next';
import { SettingsView } from '@/features/profile/components/SettingsView';

export const metadata: Metadata = { title: 'Configuración · Finanzas' };

// Perfil, contraseña, moneda y desactivar la cuenta (Módulo 1: COACP, CACON, COPRE y GESCU)
export default function ConfiguracionPage() {
  return <SettingsView />;
}
