import {
  ChartIcon,
  CreditCardIcon,
  HistoryIcon,
  HomeIcon,
  ReceiptIcon,
  SettingsIcon,
  TargetIcon,
  WalletIcon,
  type IconComponent,
} from '@/components/ui/atoms/icons';

// Un destino de la navegación principal (Sidebar y, después, la topbar)
export type NavItemData = {
  label: string;
  href: string;
  icon: IconComponent;
};

/* ══ NAVEGACIÓN · Figma › Organisms › O01 Sidebar ══ */
/* Los nombres son los módulos de los RF (Guía para desarrollo v1): Informes y no «Reportes»,
   Ajustes y no «Configuración», y se agrega Historial, que no estaba en Figma */

// Sección «Menú»: un ítem por módulo, en el orden de Figma
export const mainNav: NavItemData[] = [
  { label: 'Inicio', href: '/inicio', icon: HomeIcon },
  { label: 'Movimientos', href: '/movimientos', icon: ReceiptIcon },
  { label: 'Objetivos', href: '/objetivos', icon: TargetIcon },
  { label: 'Tarjetas', href: '/tarjetas', icon: CreditCardIcon },
  { label: 'Cartera', href: '/cartera', icon: WalletIcon },
  { label: 'Historial', href: '/historial', icon: HistoryIcon },
  { label: 'Informes', href: '/informes', icon: ChartIcon },
];

// Sección «General»
export const generalNav: NavItemData[] = [{ label: 'Ajustes', href: '/ajustes', icon: SettingsIcon }];

// El botón principal del Sidebar
export const NEW_MOVEMENT_HREF = '/movimientos/nuevo';

// Un ítem está activo en su ruta y en las que cuelgan de ella (/movimientos/123 marca Movimientos).
// /movimientos/nuevo también marca Movimientos: es parte del módulo
export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
