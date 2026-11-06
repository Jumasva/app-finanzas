import type { Metadata } from 'next';
import { CreditCardIcon } from '@/components/ui/atoms/icons';
import { ComingSoon } from '@/features/navigation/components/ComingSoon';

export const metadata: Metadata = { title: 'Tarjetas · Finanzas' };

// Provisional hasta construir el módulo
export default function TarjetasPage() {
  return (
    <ComingSoon
      title="Tarjetas"
      icon={CreditCardIcon}
      description="Aquí registrarás tus tarjetas de crédito, sus compras y sus pagos."
    />
  );
}
