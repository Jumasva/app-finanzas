import { cn } from '@/lib/cn';

type Size = 'md' | 'lg';

type SwitchProps = Omit<React.ComponentProps<'input'>, 'type' | 'size'> & {
  size?: Size;
};

/* ══ CLASES · Figma › Atomic Design › Radio & Switch ══ */
/* Switch: un ajuste que se aplica al instante, sin botón de guardar */

const sizes: Record<Size, { track: string; knob: string }> = {
  // 36 × 20, knob de 16 px que se mueve 16 px
  md: { track: 'h-5 w-9', knob: 'size-4 peer-checked:translate-x-4' },
  // 44 × 24, knob de 20 px que se mueve 20 px
  lg: { track: 'h-6 w-11', knob: 'size-5 peer-checked:translate-x-5' },
};

const track = [
  // El input es el riel: se le quita el dibujo del navegador
  'peer cursor-pointer appearance-none rounded-full bg-neutral-400 transition-colors',
  // On: verde
  'checked:bg-emerald-600',
  // Hover sobre toda la fila: un tono más oscuro
  'enabled:group-hover:bg-neutral-500 enabled:group-hover:checked:bg-emerald-700',
  // Deshabilitado: off gris claro, on verde claro
  'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:checked:bg-emerald-200',
];

/* ══ SWITCH · ajuste encendido/apagado, con su texto ══ */

export function Switch({ size = 'md', disabled = false, className, children, ...props }: SwitchProps) {
  return (
    <label
      className={cn(
        'group inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-body text-navy-900',
        disabled && 'cursor-not-allowed text-neutral-300',
        className,
      )}
    >
      <span className="relative inline-flex shrink-0">
        {/* role="switch": el lector dice «activado / desactivado» en vez de «marcada» */}
        <input {...props} type="checkbox" role="switch" disabled={disabled} className={cn(track, sizes[size].track)} />
        {/* Knob: blanco con sombra nivel 1; se desliza cuando el input está marcado */}
        <span
          className={cn(
            'pointer-events-none absolute top-0.5 left-0.5 rounded-full bg-white shadow-elevation-1 transition-transform',
            sizes[size].knob,
          )}
          aria-hidden="true"
        />
      </span>

      {children}
    </label>
  );
}
