'use client';

import { useEffect, useId, useRef } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { AlertIcon, InfoIcon } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type Tone = 'danger' | 'default';

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
  tone?: Tone;
  // Mientras la API responde: spinner en el botón y no se puede cerrar
  loading?: boolean;
  // Contenido extra entre el texto y los botones: un campo de contraseña, un error
  children?: React.ReactNode;
};

/* ══ CLASES · Figma › Organisms › Confirm dialog ══ */
/* 420 px, ícono de 48 en círculo, título 18 Nunito, botones grandes alineados a la derecha */

const tones: Record<Tone, { icon: typeof AlertIcon; circle: string; button: 'destructive' | 'primary' }> = {
  danger: { icon: AlertIcon, circle: 'bg-danger-light text-danger', button: 'destructive' },
  default: { icon: InfoIcon, circle: 'bg-background-brand-subtle text-brand-primary', button: 'primary' },
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
  const dialog = useRef<HTMLDialogElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const { icon: Icon, circle, button } = tones[tone];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) {
      element.showModal();
      cancel.current?.focus();
    }
    if (!open && element.open) element.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        if (!loading) onClose();
      }}
      className="m-auto w-[420px] max-w-[calc(100vw-2rem)] flex-col gap-4 rounded-xl border border-border-subtle bg-background-page p-6 text-content-primary shadow-elevation-3 backdrop:bg-navy-950/40 open:flex"
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
