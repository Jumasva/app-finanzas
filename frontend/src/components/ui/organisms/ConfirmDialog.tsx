'use client';

import { useId, useRef } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { statusIcons, type IconComponent } from '@/components/ui/atoms/icons';
import { useModal } from '@/components/ui/hooks/useModal';
import { modalBackdrop, modalPanel } from '@/components/ui/styles';
import { cn } from '@/lib/cn';

type Tone = 'danger' | 'brand';

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  // Una pregunta concreta: «¿Anular el egreso "Mercado" de $120.000?»
  title: string;
  // Qué pasa si confirma. Las anulaciones no se deshacen (RNF-USA-003 y 005)
  description?: React.ReactNode;
  // El verbo de la acción, nunca «Aceptar»: Anular, Desactivar
  confirmLabel: string;
  cancelLabel?: string;
  // danger: acciones destructivas. brand: confirmaciones que no destruyen nada
  tone?: Tone;
  // Mientras la API responde: spinner en el botón y no se puede cerrar
  loading?: boolean;
  // Contenido extra entre el texto y los botones: un campo de contraseña, un error
  children?: React.ReactNode;
};

/* ══ CLASES · Figma › Organisms › Confirm dialog ══ */
/* 420 px, ícono de 24 en un círculo de 48, título 18 Nunito y botones grandes a la derecha */

const tones: Record<Tone, { icon: IconComponent; circle: string; button: 'destructive' | 'primary' }> = {
  danger: { icon: statusIcons.danger, circle: 'bg-danger-light text-danger', button: 'destructive' },
  brand: { icon: statusIcons.info, circle: 'bg-background-brand-subtle text-brand-primary', button: 'primary' },
};

/* ══ CONFIRMDIALOG · confirmar una acción que no se puede deshacer ══ */
/* role alertdialog: el foco empieza en Cancelar, la opción segura */

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancelar',
  tone = 'danger',
  loading = false,
  children,
}: ConfirmDialogProps) {
  const cancel = useRef<HTMLButtonElement>(null);
  const dialog = useModal(open, cancel);
  const titleId = useId();
  const descriptionId = useId();
  const { icon: Icon, circle, button } = tones[tone];

  return (
    <dialog
      ref={dialog}
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      // Escape: se cancela el cierre del navegador y decide el padre (loading lo impide)
      onCancel={(event) => {
        event.preventDefault();
        if (!loading) onClose();
      }}
      className={cn(
        'm-auto w-[420px] max-w-[calc(100vw-2rem)] flex-col gap-4 rounded-xl p-6 open:flex',
        modalPanel,
        modalBackdrop,
      )}
    >
      <span className={cn('grid size-12 place-items-center rounded-full', circle)}>
        <Icon size={24} />
      </span>

      <div className="flex flex-col gap-2">
        <h2 id={titleId} className="text-h4">
          {title}
        </h2>
        {description && (
          <div id={descriptionId} className="text-body text-content-secondary">
            {description}
          </div>
        )}
      </div>

      {children}

      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button ref={cancel} variant="secondary" size="lg" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button variant={button} size="lg" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}
