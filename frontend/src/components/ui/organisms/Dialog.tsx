'use client';

import { useId } from 'react';
import { XIcon } from '@/components/ui/atoms/icons';
import { useModal } from '@/components/ui/hooks/useModal';
import { iconButton, modalBackdrop, modalPanel } from '@/components/ui/styles';
import { cn } from '@/lib/cn';

type Placement = 'center' | 'side';

type DialogProps = {
  open: boolean;
  // Escape, la x, el clic en el fondo o Cancelar
  onClose: () => void;
  title: string;
  // Debajo del título, para el lector de pantalla y la vista
  description?: string;
  // Botones de abajo. Van alineados a la derecha
  footer?: React.ReactNode;
  // center: Modal (560 px). side: Drawer a la derecha (420 px, alto completo)
  placement?: Placement;
  // Mientras se guarda, Escape y el fondo no cierran
  busy?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/* ══ CLASES · Figma › Organisms › New movement modal y Detail drawer ══ */
/* Encabezado con título y botón x de 36, cuerpo con scroll, pie con borde arriba. Sombra nivel 3.
   En móvil los dos ocupan el ancho completo y suben desde abajo */

const placements: Record<Placement, string> = {
  center:
    'mx-auto mt-auto mb-0 max-h-[92dvh] w-full max-w-none rounded-t-xl sm:my-auto sm:max-h-[calc(100dvh-4rem)] sm:w-[560px] sm:max-w-[calc(100vw-2rem)] sm:rounded-xl',
  side: 'mt-auto mr-0 mb-0 ml-auto max-h-[92dvh] w-full max-w-none rounded-t-xl sm:mt-0 sm:h-dvh sm:max-h-dvh sm:w-[420px] sm:rounded-none',
};

/* ══ DIALOG · contenedor flotante sobre la página (Modal y Drawer) ══ */
/* <dialog> modal (useModal): el navegador atrapa el foco y al cerrar lo devuelve al botón que lo abrió */

export function Dialog({
  open,
  onClose,
  title,
  description,
  footer,
  placement = 'center',
  busy = false,
  className,
  children,
}: DialogProps) {
  const dialog = useModal(open);
  const titleId = useId();
  const descriptionId = useId();

  function requestClose() {
    if (!busy) onClose();
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      // Escape: se cancela el cierre del navegador y decide el padre (busy lo impide)
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      // El clic en el fondo llega al propio <dialog>
      onClick={(event) => event.target === event.currentTarget && requestClose()}
      className={cn(
        'flex-col overflow-hidden p-0 open:flex',
        modalPanel,
        modalBackdrop,
        placements[placement],
        className,
      )}
    >
      <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border-subtle px-6 py-5">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 id={titleId} className="text-h3">
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className="text-body text-content-secondary">
              {description}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={busy}
          aria-label="Cerrar"
          className={cn(iconButton, '-mt-1 -mr-2')}
        >
          <XIcon size={20} />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>

      {footer && (
        <footer className="flex shrink-0 flex-wrap justify-end gap-3 border-t border-border-subtle px-6 py-4">
          {footer}
        </footer>
      )}
    </dialog>
  );
}
