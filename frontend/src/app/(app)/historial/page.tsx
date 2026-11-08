import type { Metadata } from 'next';
import { HistoryIcon } from '@/components/ui/atoms/icons';
import { ComingSoon } from '@/features/navigation/components/ComingSoon';

export const metadata: Metadata = { title: 'Historial · Finanzas' };

// Provisional hasta construir el módulo
export default function HistorialPage() {
  return <ComingSoon icon={HistoryIcon} description="Aquí consultarás todos tus registros y sus cambios." />;
}
