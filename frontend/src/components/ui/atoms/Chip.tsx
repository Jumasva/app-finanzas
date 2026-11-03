import { CheckIcon, XIcon, type IconComponent } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type ChipProps = Omit<React.ComponentProps<'button'>, 'type'> & {
  selected?: boolean;
  icon?: IconComponent;
  onRemove?: () => void;
  removeLabel?: string;
};

/* ══ CLASES  ══ */
/* Filtro que se activa y se desactiva. Alto 32 px, zona táctil de 44 px en móvil */

const base =
  'relative inline-flex h-8 items-center rounded-full border text-label-sm whitespace-nowrap transition-colors';

// Borde, fondo y texto según el estado
function chipState(selected: boolean, disabled: boolean) {
  if (disabled) return 'border-transparent bg-neutral-50 text-neutral-300';
  if (selected) return 'border-emerald-600 bg-emerald-50 text-emerald-700 hover:bg-emerald-100';
  return 'border-neutral-100 bg-white text-navy-900 hover:border-neutral-400 hover:bg-neutral-50';
}

// En móvil la zona táctil crece 6 px arriba y abajo (32 → 44) sin cambiar lo que se ve
const touchArea = 'before:absolute before:inset-x-0 before:-inset-y-1.5 md:before:hidden';

/* ══ CHIP · filtro seleccionable, con ícono o removible ══ */

export function Chip({
  selected = false,
  icon,
  onRemove,
  removeLabel = 'Quitar',
  disabled = false,
  className,
  children,
  ...props
}: ChipProps) {
  // Con ícono propio se muestra ese; sin ícono, el check aparece al seleccionar
  const LeadIcon = icon ?? (selected ? CheckIcon : undefined);

  return (
    <span className={cn(base, chipState(selected, disabled), className)}>
      <button
        type="button"
        aria-pressed={selected}
        disabled={disabled}
        className={cn(
          'inline-flex h-full items-center gap-1.5 rounded-full pl-3 disabled:cursor-not-allowed',
          onRemove ? 'pr-0' : 'pr-3',
          touchArea,
        )}
        {...props}
      >
        {LeadIcon && <LeadIcon size={16} className={cn(!icon && 'size-3.5')} />}
        {children}
      </button>

      {/* La x es otro botón: quitar no es lo mismo que seleccionar */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          aria-label={removeLabel}
          className="relative z-10 grid h-full w-8 place-items-center rounded-full disabled:cursor-not-allowed"
        >
          <XIcon className="size-3.5" />
        </button>
      )}
    </span>
  );
}
