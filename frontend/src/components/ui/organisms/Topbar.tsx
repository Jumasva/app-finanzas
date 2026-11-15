'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/molecules/Breadcrumbs';
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

/* ── Título: la miga de pan de la ruta actual; la página actual es el h1 de la pantalla ── */

function PageTitle() {
  return <Breadcrumbs items={breadcrumbs(usePathname())} currentAs="h1" className="flex-1" />;
}
