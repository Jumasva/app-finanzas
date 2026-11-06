import type { Metadata } from 'next';
import { TargetIcon } from '@/components/ui/atoms/icons';
import { ComingSoon } from '@/features/navigation/components/ComingSoon';

export const metadata: Metadata = { title: 'Objetivos · Finanzas' };

// Provisional hasta construir el módulo
export default function ObjetivosPage() {
  return (
    <ComingSoon
      title="Objetivos"
      icon={TargetIcon}
      description="Aquí crearás objetivos de ahorro y seguirás su progreso."
    />
  );
}
