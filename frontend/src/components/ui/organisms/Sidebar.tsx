'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Avatar } from '@/components/ui/atoms/Avatar';
import { ButtonLink } from '@/components/ui/atoms/Button';
import { LoaderIcon, LogOutIcon, PanelLeftIcon, PlusIcon, XIcon } from '@/components/ui/atoms/icons';
import { Tooltip } from '@/components/ui/atoms/Tooltip';
import { NavItem } from '@/components/ui/molecules/NavItem';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useSession } from '@/features/auth/session';
import { generalNav, mainNav, NEW_MOVEMENT_HREF, type NavItemData } from '@/features/navigation/items';
import { useSidebarCollapsed } from '@/features/navigation/useSidebarCollapsed';
import { cn } from '@/lib/cn';
import { initials } from '@/lib/format';

/* ══ CLASES · Figma › Organisms › O01 Sidebar ══ */
/* Navegación principal en desktop: 264 px expandido, 72 px colapsado (solo íconos) */

// Botón de solo ícono, gris: colapsar, cerrar el cajón y cerrar sesión
export const iconButton =
  'grid size-9 shrink-0 place-items-center rounded-md text-neutral-500 transition-colors hover:bg-background-subtle hover:text-content-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus disabled:cursor-not-allowed';

/* ══ SIDEBAR · columna fija a la izquierda, desde 1024 px (lg) ══ */
/* En pantallas más pequeñas la navegación es el cajón de MobileNav */

export function Sidebar() {
  const { collapsed, toggle } = useSidebarCollapsed();

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen shrink-0 border-r border-border-subtle bg-background-page transition-[width] duration-200 lg:block',
        collapsed ? 'w-[72px]' : 'w-[264px]',
      )}
    >
      <SidebarPanel collapsed={collapsed} onToggle={toggle} />
    </aside>
  );
}

/* ══ SIDEBARPANEL · el contenido: lo comparten el Sidebar y el cajón móvil ══ */

type SidebarPanelProps = {
  collapsed?: boolean;
  // Desktop: botón para colapsar o expandir
  onToggle?: () => void;
  // Móvil: botón para cerrar el cajón, y cerrarlo al navegar
  onClose?: () => void;
};

export function SidebarPanel({ collapsed = false, onToggle, onClose }: SidebarPanelProps) {
  return (
    <div className={cn('flex h-full flex-col gap-8 overflow-y-auto py-6', collapsed ? 'items-center px-3' : 'px-5')}>
      <SidebarHeader collapsed={collapsed} onToggle={onToggle} onClose={onClose} />

      <nav
        aria-label="Principal"
        className={cn('flex flex-1 flex-col justify-between gap-8', collapsed && 'items-center')}
      >
        <NavSection title="Menú" items={mainNav} collapsed={collapsed} onNavigate={onClose} />
        <NavSection title="General" items={generalNav} collapsed={collapsed} onNavigate={onClose} />
      </nav>

      <UserCard collapsed={collapsed} />
    </div>
  );
}

/* ── Logo, colapsar o cerrar, y «Nuevo movimiento» ── */

function SidebarHeader({ collapsed, onToggle, onClose }: SidebarPanelProps) {
  const toggleLabel = collapsed ? 'Expandir menú' : 'Contraer menú';

  return (
    <div className={cn('flex flex-col gap-6', collapsed && 'items-center')}>
      <div className={cn('flex items-center', collapsed ? 'flex-col gap-4' : 'justify-between')}>
        <Link
          href="/inicio"
          onClick={onClose}
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
        >
          {collapsed ? (
            <Image src="/logo/isotipo.svg" alt="Finanzas, ir al inicio" width={32} height={32} />
          ) : (
            <Image src="/logo/logo_horizontal.svg" alt="Finanzas, ir al inicio" width={130} height={36} />
          )}
        </Link>

        {onToggle && (
          <Tooltip content={toggleLabel} placement={collapsed ? 'right' : 'bottom'}>
            <button
              type="button"
              onClick={onToggle}
              aria-label={toggleLabel}
              aria-expanded={!collapsed}
              className={iconButton}
            >
              <PanelLeftIcon size={20} />
            </button>
          </Tooltip>
        )}

        {onClose && (
          <button type="button" onClick={onClose} aria-label="Cerrar menú" className={iconButton}>
            <XIcon size={20} />
          </button>
        )}
      </div>

      {collapsed ? (
        <Tooltip content="Nuevo movimiento" placement="right">
          <ButtonLink href={NEW_MOVEMENT_HREF} iconLeft={PlusIcon} aria-label="Nuevo movimiento" />
        </Tooltip>
      ) : (
        <ButtonLink href={NEW_MOVEMENT_HREF} iconLeft={PlusIcon} onClick={onClose} className="w-full">
          Nuevo movimiento
        </ButtonLink>
      )}
    </div>
  );
}

/* ── Una sección de la navegación: overline y su lista ── */

function NavSection({
  title,
  items,
  collapsed,
  onNavigate,
}: {
  title: string;
  items: NavItemData[];
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const id = `nav-${title.toLowerCase()}`;

  return (
    <div className="flex flex-col gap-4">
      {/* Colapsado no se ve, pero sigue nombrando la lista para el lector de pantalla */}
      <p id={id} className={cn('text-overline text-content-tertiary uppercase', collapsed && 'sr-only')}>
        {title}
      </p>
      <ul aria-labelledby={id} className={cn('flex flex-col gap-1', collapsed && 'items-center')}>
        {items.map((item) => (
          <li key={item.href} className={cn(!collapsed && 'w-full')}>
            <NavItem item={item} collapsed={collapsed} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Usuario con sesión y cerrar sesión (RF-CIESE) ── */

function UserCard({ collapsed }: { collapsed: boolean }) {
  const user = useSession();
  const { loggingOut, error, logout } = useLogout();

  // Solo pasa el primer instante, mientras /auth/me responde (la app está oculta)
  if (!user) return null;

  const logoutButton = (
    <Tooltip content="Cerrar sesión" placement={collapsed ? 'right' : 'top'}>
      <button
        type="button"
        onClick={logout}
        disabled={loggingOut}
        aria-label="Cerrar sesión"
        aria-busy={loggingOut || undefined}
        className={iconButton}
      >
        {loggingOut ? <LoaderIcon size={20} className="animate-spin" /> : <LogOutIcon size={20} />}
      </button>
    </Tooltip>
  );

  return (
    <div className="flex flex-col gap-2">
      {collapsed ? (
        <div className="flex flex-col items-center gap-2">
          <Avatar name={user.name} initials={initials(user.name)} />
          {logoutButton}
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-lg bg-background-brand-subtle py-2 pr-2 pl-3">
          <Avatar name={user.name} initials={initials(user.name)} />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-label text-content-primary">{user.name}</span>
            <span className="truncate text-body-sm text-content-secondary">{user.email}</span>
          </div>
          {logoutButton}
        </div>
      )}

      {error && (
        <p role="alert" className={cn('text-body-sm text-danger-dark', collapsed && 'w-12 text-center')}>
          {error}
        </p>
      )}
    </div>
  );
}
