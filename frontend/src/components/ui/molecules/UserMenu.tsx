'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Avatar } from '@/components/ui/atoms/Avatar';
import {
  ChevronDownIcon,
  LoaderIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  type IconComponent,
} from '@/components/ui/atoms/icons';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useSession } from '@/features/auth/session';
import { cn } from '@/lib/cn';
import { initials } from '@/lib/format';

/* ══ CLASES · Figma › Organisms › O02 Topbar › User menu ══ */
/* Diseño provisional: el desplegable se ajusta después en Figma */

const item =
  'flex h-10 w-full items-center gap-3 rounded-sm px-3 text-body text-content-primary outline-none transition-colors hover:bg-background-subtle focus-visible:bg-background-subtle disabled:cursor-not-allowed';

/* ══ USERMENU · avatar del usuario con su menú: Mi perfil, Ajustes y Cerrar sesión ══ */
/* Patrón «menu button» de WAI-ARIA: flechas para moverse, Escape cierra y devuelve el foco al botón */

export function UserMenu() {
  const user = useSession();
  const { loggingOut, error, logout } = useLogout();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // Al abrir, el foco pasa a la primera opción
  useEffect(() => {
    if (open) menuItems()[0]?.focus();
  }, [open]);

  // Un clic fuera lo cierra
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  function menuItems() {
    return Array.from(menu.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
  }

  function close({ returnFocus = false } = {}) {
    setOpen(false);
    if (returnFocus) button.current?.focus();
  }

  function onMenuKeyDown(event: React.KeyboardEvent) {
    const items = menuItems();
    const index = items.indexOf(document.activeElement as HTMLElement);
    const focus = (i: number) => items[(i + items.length) % items.length]?.focus();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focus(index + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focus(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focus(0);
        break;
      case 'End':
        event.preventDefault();
        focus(items.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        close({ returnFocus: true });
        break;
      case 'Tab':
        // Tab sale del menú hacia el siguiente elemento de la página
        close();
        break;
    }
  }

  // Solo pasa el primer instante, mientras /auth/me responde (la app está oculta)
  if (!user) return null;

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`Menú de ${user.name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        className="flex items-center gap-2 rounded-full p-1 pr-2 text-content-tertiary transition-colors hover:bg-background-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
      >
        <Avatar name={user.name} initials={initials(user.name)} size={32} status aria-hidden="true" />
        <ChevronDownIcon size={16} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          ref={menu}
          id={menuId}
          role="menu"
          aria-label={`Menú de ${user.name}`}
          onKeyDown={onMenuKeyDown}
          className="absolute top-full right-0 z-40 mt-2 flex w-60 flex-col rounded-lg border border-border-subtle bg-background-page p-1.5 shadow-elevation-2"
        >
          {/* Quién tiene la sesión: no es una opción, el lector lo salta con las flechas */}
          <div role="none" className="flex flex-col border-b border-border-subtle px-3 pt-1.5 pb-2.5">
            <span className="truncate text-label text-content-primary">{user.name}</span>
            <span className="truncate text-body-sm text-content-secondary">{user.email}</span>
          </div>

          <div role="none" className="flex flex-col pt-1.5">
            <MenuLink href="/ajustes/perfil" icon={UserIcon} onSelect={() => close()}>
              Mi perfil
            </MenuLink>
            <MenuLink href="/ajustes" icon={SettingsIcon} onSelect={() => close()}>
              Ajustes
            </MenuLink>

            <button
              type="button"
              role="menuitem"
              tabIndex={-1}
              onClick={logout}
              disabled={loggingOut}
              aria-busy={loggingOut || undefined}
              className={cn(item, 'text-danger-dark hover:bg-danger-light focus-visible:bg-danger-light')}
            >
              {loggingOut ? <LoaderIcon size={20} className="animate-spin" /> : <LogOutIcon size={20} />}
              Cerrar sesión
            </button>

            {error && (
              <p role="alert" className="px-3 py-2 text-body-sm text-danger-dark">
                {error}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  icon: Icon,
  onSelect,
  children,
}: {
  href: string;
  icon: IconComponent;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    // tabIndex -1: dentro del menú se navega con las flechas, no con Tab
    <Link href={href} role="menuitem" tabIndex={-1} onClick={onSelect} className={item}>
      <Icon size={20} className="text-neutral-600" />
      {children}
    </Link>
  );
}
