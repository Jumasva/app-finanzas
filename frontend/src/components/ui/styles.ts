/* ══ ESTILOS COMPARTIDOS · clases que usan varios componentes del design system ══ */
/* Si una clase se repite en dos componentes, va aquí: así un cambio de Figma se hace en un solo lugar */

/* ── Botón gris de solo ícono: colapsar, cerrar, flechas de periodo y calendario, menú ⋯ ── */

export const iconButton =
  'grid size-9 shrink-0 place-items-center rounded-md text-content-tertiary transition-colors hover:bg-background-subtle hover:text-content-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus disabled:cursor-not-allowed';

// Deshabilitado se ve apagado y sin hover (flechas de periodo, paginación)
export const iconButtonDisabled = 'disabled:text-content-disabled disabled:hover:bg-transparent';

/* ── Caja de los campos: Input, Select y Date field (Figma › Atomic Design › Input) ── */

export type FieldSize = 'md' | 'lg';

export const fieldBase = 'flex w-full items-center gap-2.5 border-[1.5px] bg-background-page transition-colors';

// En móvil el texto siempre es de 16 px: con menos, iOS hace zoom al enfocar
export const fieldSizes: Record<FieldSize, string> = {
  md: 'h-10 rounded-sm px-3 text-body-lg md:text-body',
  lg: 'h-12 rounded-md px-3.5 text-body-lg',
};

// Ícono de la izquierda según el tamaño
export const fieldIconSizes: Record<FieldSize, string> = {
  md: 'size-[18px]',
  lg: 'size-5',
};

// Borde, fondo y anillo según el estado. `open`: el desplegable del campo está abierto (Select, Date field)
export function fieldState({
  invalid = false,
  disabled = false,
  open = false,
}: {
  invalid?: boolean;
  disabled?: boolean;
  open?: boolean;
}) {
  if (disabled) return 'cursor-not-allowed border-border-subtle bg-background-subtle';
  if (invalid) return 'border-danger ring-3 ring-danger-light';
  if (open) return 'border-border-focus ring-3 ring-emerald-100';
  return 'border-border-default hover:not-focus-within:border-neutral-500 focus-within:border-border-focus focus-within:ring-3 focus-within:ring-emerald-100';
}

// Color de los íconos: gris, verde al enfocar o abrir, apagado si está deshabilitado. Con error no se pone verde
export function fieldIconState({
  invalid = false,
  disabled = false,
  open = false,
}: {
  invalid?: boolean;
  disabled?: boolean;
  open?: boolean;
}) {
  if (disabled) return 'text-content-disabled';
  if (invalid) return 'text-content-tertiary';
  if (open) return 'text-brand-primary';
  return 'text-content-tertiary group-focus-within:text-brand-primary';
}

/* ── Ventanas modales (<dialog>): Dialog, Confirm dialog y el cajón del menú móvil ── */

// Fondo oscuro detrás del modal
export const modalBackdrop = 'backdrop:bg-background-inverse/40';

export const modalPanel = 'border border-border-subtle bg-background-page text-content-primary shadow-elevation-3';

/* ── Panel flotante: menús, opciones del Select y calendario ── */

export const popoverPanel = 'rounded-lg border border-border-subtle bg-background-page shadow-elevation-2';

/* ── Opción de una lista (menú, Select) ── */

export const listOption =
  'flex h-10 w-full items-center gap-3 rounded-sm px-3 text-body text-content-primary outline-none transition-colors';
