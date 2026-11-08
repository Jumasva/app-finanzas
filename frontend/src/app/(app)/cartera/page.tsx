import type { Metadata } from 'next';
import { WalletIcon } from '@/components/ui/atoms/icons';
import { ComingSoon } from '@/features/navigation/components/ComingSoon';

export const metadata: Metadata = { title: 'Cartera · Finanzas' };

// Provisional hasta construir el módulo
export default function CarteraPage() {
  return <ComingSoon icon={WalletIcon} description="Aquí llevarás las deudas que tienes y lo que te deben." />;
}
