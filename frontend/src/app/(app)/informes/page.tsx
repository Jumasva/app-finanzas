import type { Metadata } from 'next';
import { ChartIcon } from '@/components/ui/atoms/icons';
import { ComingSoon } from '@/features/navigation/components/ComingSoon';

export const metadata: Metadata = { title: 'Informes · Finanzas' };

// Provisional hasta construir el módulo
export default function InformesPage() {
  return (
    <ComingSoon icon={ChartIcon} description="Aquí verás informes de tus ingresos, egresos, objetivos y cartera." />
  );
}
