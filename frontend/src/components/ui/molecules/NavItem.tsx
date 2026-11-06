'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip } from '@/components/ui/atoms/Tooltip';
import { isActivePath, type NavItemData } from '@/features/navigation/items';
import { cn } from '@/lib/cn';

type NavItemProps = {
  item: NavItemData;
  // Solo ícono (Sidebar colapsado): el nombre pasa a un tooltip a la derecha
  collapsed?: boolean;
  // Al hacer clic, por ejemplo para cerrar el cajón en móvil
  onNavigate?: () => void;
};

/* ══ CLASES · Figma › Organisms › O01 Sidebar › Nav item ══ */
/* 40 px de alto, ícono de 20 y 12 px hasta el texto. Activo: fondo emerald/50, texto emerald/700
   y una barra de 3 × 24 px a la izquierda. Expandido 264 px · colapsado 72 px */

const base =
  'group relative flex h-10 items-center rounded-md text-body transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus';

/* ══ NAVITEM · enlace de la navegación principal con su estado activo ══ */

// La ruta se lee dentro de Suspense: con cacheComponents, usePathname suspende en las rutas con
// parámetros dinámicos (/movimientos/[id]). Mientras tanto se muestra el ítem sin marcar
export function NavItem(props: NavItemProps) {
  return (
    <Suspense fallback={<NavLink {...props} active={false} />}>
      <ActiveNavLink {...props} />
    </Suspense>
  );
}

function ActiveNavLink(props: NavItemProps) {
  const pathname = usePathname();
  return <NavLink {...props} active={isActivePath(pathname, props.item.href)} />;
}

function NavLink({ item, collapsed = false, onNavigate, active }: NavItemProps & { active: boolean }) {
  const { label, href, icon: Icon } = item;

  const link = (
    <Link
      href={href}
      onClick={onNavigate}
      // Lo anuncian los lectores de pantalla: «Inicio, página actual»
      aria-current={active ? 'page' : undefined}
      className={cn(
        base,
        collapsed ? 'w-12 justify-center' : 'w-full gap-3 px-3',
        active
          ? 'bg-background-brand-subtle font-semibold text-content-link'
          : 'text-neutral-700 hover:bg-background-subtle hover:text-content-primary',
      )}
    >
      {/* Barra del ítem activo: por fuera del fondo, pegada al borde izquierdo */}
      {active && (
        <span
          aria-hidden="true"
          className="absolute top-1/2 -left-2.5 h-6 w-[3px] -translate-y-1/2 rounded-full bg-brand-primary"
        />
      )}

      <Icon size={20} className={active ? 'text-brand-primary' : 'text-neutral-600 group-hover:text-content-primary'} />

      {/* Colapsado el texto no se ve, pero sigue siendo el nombre del enlace */}
      <span className={cn('truncate', collapsed && 'sr-only')}>{label}</span>
    </Link>
  );

  return collapsed ? (
    <Tooltip content={label} placement="right">
      {link}
    </Tooltip>
  ) : (
    link
  );
}
