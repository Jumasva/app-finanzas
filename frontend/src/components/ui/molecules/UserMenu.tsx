'use client';

import { Avatar } from '@/components/ui/atoms/Avatar';
import { ChevronDownIcon, LogOutIcon, SettingsIcon, UserIcon } from '@/components/ui/atoms/icons';
import { DropdownMenu } from '@/components/ui/molecules/DropdownMenu';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useSession } from '@/features/auth/session';
import { initials } from '@/lib/format';

/* ══ USERMENU · Figma › Organisms › O02 Topbar › User menu ══ */
/* Avatar del usuario con su menú: Mi perfil, Configuración y Cerrar sesión. El menú es el Dropdown menu (M14) */

export function UserMenu() {
  const user = useSession();
  const { loggingOut, error, logout } = useLogout();

  // Solo pasa el primer instante, mientras /auth/me responde (la app está oculta)
  if (!user) return null;

  return (
    <DropdownMenu
      label={`Menú de ${user.name}`}
      trigger={
        <>
          <Avatar name={user.name} initials={initials(user.name)} size={32} status aria-hidden="true" />
          <ChevronDownIcon size={16} className="transition-transform group-aria-expanded:rotate-180" />
        </>
      }
      triggerClassName="group flex items-center gap-2 rounded-full p-1 pr-2 text-content-tertiary transition-colors hover:bg-background-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
      header={
        // Quién tiene la sesión
        <div className="flex flex-col">
          <span className="truncate text-label text-content-primary">{user.name}</span>
          <span className="truncate text-body-sm text-content-secondary">{user.email}</span>
        </div>
      }
      items={[
        { label: 'Mi perfil', href: '/configuracion/perfil', icon: UserIcon },
        { label: 'Configuración', href: '/configuracion', icon: SettingsIcon },
        'divider',
        {
          label: 'Cerrar sesión',
          icon: LogOutIcon,
          onSelect: logout,
          loading: loggingOut,
          keepOpen: true,
          danger: true,
        },
      ]}
      footer={
        error && (
          <p role="alert" className="px-3 py-2 text-body-sm text-danger-dark">
            {error}
          </p>
        )
      }
    />
  );
}
