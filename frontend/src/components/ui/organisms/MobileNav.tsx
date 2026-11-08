'use client';

import { useEffect, useRef, useState } from 'react';
import { MenuIcon } from '@/components/ui/atoms/icons';
import { iconButton, SidebarPanel } from '@/components/ui/organisms/Sidebar';
import { cn } from '@/lib/cn';

/* ══ MOBILENAV · botón del menú (va en la Topbar) y el cajón, por debajo de 1024 px (lg) ══ */
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
      <button
        type="button"
        onClick={openDrawer}
        aria-label="Abrir menú"
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(iconButton, '-ml-2 lg:hidden')}
      >
        <MenuIcon size={24} />
      </button>

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
