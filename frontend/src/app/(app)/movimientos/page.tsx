import type { Metadata } from 'next';
import { ReceiptIcon } from '@/components/ui/atoms/icons';
import { ComingSoon } from '@/features/navigation/components/ComingSoon';

export const metadata: Metadata = { title: 'Movimientos · Finanzas' };

// Provisional hasta construir el módulo
export default function MovimientosPage() {
  return (
    <ComingSoon
      title="Movimientos"
      icon={ReceiptIcon}
      description="Aquí registrarás tus ingresos y egresos y verás tu saldo."
    />
  );
}
