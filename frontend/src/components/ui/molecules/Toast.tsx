import { statusIcons, XIcon, type Status } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

export type ToastTone = 'success' | 'danger' | 'neutral';

export type ToastProps = {
  message: string;
  tone?: ToastTone;
  // Una sola acción: Reintentar, Ver. No hay «Deshacer»: una anulación no se deshace (RNF-USA-005)
  action?: { label: string; onClick: () => void };
  onClose?: () => void;
  className?: string;
};

/* ══ CLASES · Figma › Molecules › M09 Toast ══ */
/* Fondo navy/900, texto blanco 14, sombra nivel 3, ancho de 360 a 400. La acción va en emerald/300 */

// Sobre el fondo oscuro los íconos van en los tonos 300 (200 el neutro) para que contrasten
const tones: Record<ToastTone, { status: Status; color: string }> = {
  success: { status: 'success', color: 'text-emerald-300' },
  danger: { status: 'danger', color: 'text-red-300' },
  neutral: { status: 'info', color: 'text-navy-200' },
};

/* ══ TOAST · confirmación temporal después de una acción ══ */
/* Solo la vista. Mostrarlo, apilarlo y quitarlo a los segundos lo hace ToastProvider (useToast) */

export function Toast({ message, tone = 'neutral', action, onClose, className }: ToastProps) {
  const { status, color } = tones[tone];
  const Icon = statusIcons[status];

  return (
    <div
      className={cn(
        'flex w-full items-center gap-3 rounded-lg bg-background-inverse py-3 pr-2 pl-4 text-body text-content-inverse shadow-elevation-3 sm:w-[380px]',
        className,
      )}
    >
      <Icon size={20} className={color} />
      <p className="min-w-0 flex-1 font-semibold">{message}</p>

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="shrink-0 rounded-sm px-2 py-1 text-label text-emerald-300 hover:bg-white/10"
        >
          {action.label}
        </button>
      )}

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar aviso"
          className="grid size-8 shrink-0 place-items-center rounded-sm text-navy-200 hover:bg-white/10 hover:text-white"
        >
          <XIcon size={16} />
        </button>
      )}
    </div>
  );
}
