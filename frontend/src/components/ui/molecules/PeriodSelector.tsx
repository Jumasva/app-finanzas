import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/atoms/icons';
import { iconButton, iconButtonDisabled } from '@/components/ui/styles';
import { cn } from '@/lib/cn';

type PeriodSelectorProps = {
  // El periodo que se ve: «Octubre 2026», «1 – 31 oct 2026»
  label: string;
  onPrevious: () => void;
  onNext: () => void;
  previousDisabled?: boolean;
  // El periodo actual es el último: no se puede ir al futuro
  nextDisabled?: boolean;
  // Clic en el texto: abre el calendario (Date picker). Sin esto, el texto no es un botón
  onOpen?: () => void;
  className?: string;
};

/* ══ CLASES · Figma › Molecules › M04 Period selector ══ */
/* Alto 40, borde 1.5 px border/subtle, flechas de 32 × 32 con ícono de 18, texto 14 SemiBold */

const arrow = cn(iconButton, iconButtonDisabled, 'size-8 rounded-sm');

/* ══ PERIODSELECTOR · cambia el periodo que se está viendo (panel, movimientos, informes) ══ */

export function PeriodSelector({
  label,
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
  onOpen,
  className,
}: PeriodSelectorProps) {
  const content = (
    <>
      <CalendarIcon className="size-4 text-content-secondary" />
      <span aria-live="polite">{label}</span>
    </>
  );

  return (
    <div
      role="group"
      aria-label="Periodo"
      className={cn(
        'inline-flex h-10 items-center gap-1 rounded-md border-[1.5px] border-border-subtle bg-background-page px-1',
        className,
      )}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={previousDisabled}
        aria-label="Periodo anterior"
        className={arrow}
      >
        <ChevronLeftIcon className="size-[18px]" />
      </button>

      {onOpen ? (
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${label}. Elegir otro periodo`}
          className="flex h-8 items-center gap-2 rounded-sm px-2 text-label whitespace-nowrap text-content-primary hover:bg-background-subtle"
        >
          {content}
        </button>
      ) : (
        <span className="flex items-center gap-2 px-2 text-label whitespace-nowrap text-content-primary">
          {content}
        </span>
      )}

      <button type="button" onClick={onNext} disabled={nextDisabled} aria-label="Periodo siguiente" className={arrow}>
        <ChevronRightIcon className="size-[18px]" />
      </button>
    </div>
  );
}
