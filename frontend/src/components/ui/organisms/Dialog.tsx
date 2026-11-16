'use client';

import { useEffect, useId, useRef } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { XIcon } from '@/components/ui/atoms/icons';
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
    'mx-auto mt-auto mb-0 w-full max-w-none rounded-t-xl sm:my-auto sm:w-[560px] sm:max-w-[calc(100vw-2rem)] sm:rounded-xl max-h-[92dvh] sm:max-h-[calc(100dvh-4rem)]',
  side: 'mt-auto mr-0 mb-0 ml-auto w-full max-w-none rounded-t-xl sm:mt-0 sm:h-dvh sm:max-h-dvh sm:w-[420px] sm:rounded-none max-h-[92dvh]',
};

/* ══ DIALOG · contenedor flotante sobre la página (Modal y Drawer) ══ */
/* Usa <dialog> con showModal(): el navegador atrapa el foco, marca el resto de la página como inerte
   y Escape dispara cancel. Al cerrar, el foco vuelve al botón que lo abrió */

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
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        // Escape: el padre decide si se cierra (busy lo impide)
        event.preventDefault();
        if (!busy) onClose();
      }}
      onClick={(event) => {
        // El clic en el fondo llega al propio <dialog>
        if (event.target === event.currentTarget && !busy) onClose();
      }}
      className={cn(
        'flex-col overflow-hidden border border-border-subtle bg-background-page p-0 text-content-primary shadow-elevation-3 backdrop:bg-navy-950/40 open:flex',
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
        <Button
          variant="tertiary"
          iconLeft={XIcon}
          onClick={onClose}
          disabled={busy}
          aria-label="Cerrar"
          className="-mt-1 -mr-2 size-9 text-content-secondary"
        />
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
