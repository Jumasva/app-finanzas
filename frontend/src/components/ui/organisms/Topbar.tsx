'use client';

import { Fragment, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from '@/components/ui/atoms/icons';
import { UserMenu } from '@/components/ui/molecules/UserMenu';
import { MobileNav } from '@/components/ui/organisms/MobileNav';
import { breadcrumbs } from '@/features/navigation/breadcrumbs';

/* ══ CLASES · Figma › Organisms › O02 Topbar ══ */
/* Traslúcida: blanco al 80 % con desenfoque, así el contenido se intuye al pasar por debajo */

/* ══ TOPBAR · barra superior de la app: título de la página y menú del usuario ══ */
/* En móvil y tablet también lleva el botón del cajón de navegación (MobileNav) */

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border-subtle bg-background-page/80 px-4 backdrop-blur-md md:px-8 lg:h-20">
      <MobileNav />

      {/* La ruta se lee dentro de Suspense (cacheComponents), igual que en NavItem */}
      <Suspense fallback={<div className="flex-1" />}>
        <PageTitle />
      </Suspense> 

      <UserMenu />
    </header>
  );
}

/* ── Título: la página actual es el h1 de la pantalla; si cuelga de un módulo, el módulo va antes como enlace ── */

function PageTitle() {
  const crumbs = breadcrumbs(usePathname());
  const current = crumbs.at(-1);
  const parents = crumbs.slice(0, -1);

  return (
    <nav aria-label="Ruta de navegación" className="min-w-0 flex-1">
      <ol className="flex min-w-0 items-center gap-2">
        {parents.map((crumb) => (
          <Fragment key={crumb.href}>
            <li className="hidden shrink-0 sm:block">
              <Link
                href={crumb.href}
                className="rounded-sm text-h3 text-content-secondary transition-colors hover:text-content-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
              >
                {crumb.label}
              </Link>
            </li>
            <li aria-hidden="true" className="hidden shrink-0 text-content-tertiary sm:block">
              <ChevronRightIcon size={20} />
            </li>
          </Fragment>
        ))}

        {current && (
          <li className="min-w-0">
            <h1 aria-current="page" className="truncate text-h3 text-content-primary">
              {current.label}
            </h1>
          </li>
        )}
      </ol>
    </nav>
  );
}
