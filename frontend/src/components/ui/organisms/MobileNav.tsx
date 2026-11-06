'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon } from '@/components/ui/atoms/icons';
import { iconButton, SidebarPanel } from '@/components/ui/organisms/Sidebar';

/* ══ MOBILENAV · barra superior con el menú en un cajón, por debajo de 1024 px (lg) ══ */
/* Figma solo tiene el Sidebar de desktop (O01); en móvil y tablet el mismo contenido abre como cajón.
   Es un <dialog> modal: el navegador atrapa el foco, cierra con Escape y devuelve el foco al botón */

const DESKTOP = '(min-width: 1024px)';

export function MobileNav() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  function openDrawer() {
    dialog.current?.showModal();
    setOpen(true);
  }

  function closeDrawer() {
    dialog.current?.close();
  }

  // Si la ventana se agranda hasta desktop con el cajón abierto, se cierra: ahí ya se ve el Sidebar
  useEffect(() => {
    const query = window.matchMedia(DESKTOP);
    const onChange = () => query.matches && dialog.current?.close();
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border-subtle bg-background-page px-4 lg:hidden">
        <Link
          href="/inicio"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
        >
          <Image src="/logo/logo_horizontal.svg" alt="Finanzas, ir al inicio" width={115} height={32} />
        </Link>

        <button
          type="button"
          onClick={openDrawer}
          aria-label="Abrir menú"
          aria-haspopup="dialog"
          aria-expanded={open}
          className={iconButton}
        >
          <MenuIcon size={24} />
        </button>
      </header>

      <dialog
        ref={dialog}
        aria-label="Menú"
        // close() o Escape: los dos pasan por aquí
        onClose={() => setOpen(false)}
        // Clic en el fondo oscuro: el panel ocupa todo el dialog, así que solo el fondo es el propio dialog
        onClick={(event) => event.target === event.currentTarget && closeDrawer()}
        className="m-0 h-dvh max-h-none w-[min(300px,85vw)] max-w-none bg-background-page p-0 backdrop:bg-navy-900/40 lg:hidden"
      >
        <SidebarPanel onClose={closeDrawer} />
      </dialog>
    </>
  );
}
