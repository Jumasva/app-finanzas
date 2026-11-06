import type { Metadata } from 'next';
import { PlusIcon } from '@/components/ui/atoms/icons';
import { ComingSoon } from '@/features/navigation/components/ComingSoon';

export const metadata: Metadata = { title: 'Nuevo movimiento · Finanzas' };

// Provisional hasta construir el módulo
export default function NuevoMovimientoPage() {
  return <ComingSoon title="Nuevo movimiento" icon={PlusIcon} description="Aquí registrarás un ingreso o un egreso." />;
}
