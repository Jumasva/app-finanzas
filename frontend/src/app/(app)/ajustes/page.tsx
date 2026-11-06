import type { Metadata } from 'next';
import { SettingsIcon } from '@/components/ui/atoms/icons';
import { ComingSoon } from '@/features/navigation/components/ComingSoon';

export const metadata: Metadata = { title: 'Ajustes · Finanzas' };

// Provisional hasta construir el módulo
export default function AjustesPage() {
  return (
    <ComingSoon
      title="Ajustes"
      icon={SettingsIcon}
      description="Aquí cambiarás tu perfil, tu contraseña y tu moneda."
    />
  );
}
