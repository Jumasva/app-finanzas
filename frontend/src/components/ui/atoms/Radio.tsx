import { cn } from '@/lib/cn';

type RadioProps = Omit<React.ComponentProps<'input'>, 'type'>;

/* ══ CLASES · Figma › Atomic Design › Radio & Switch ══ */
/* Radio: una sola opción de un grupo. Círculo de 20 px, borde 1.5 px, punto de 10 px; zona táctil de 44 px */

const circle = [
  // Círculo vacío: se le quita el dibujo del navegador y se pinta a mano
  'peer size-5 cursor-pointer appearance-none rounded-full border-[1.5px] border-neutral-400 bg-white transition-colors',
  // Seleccionado y hover: borde verde
  'checked:border-emerald-600 enabled:group-hover:border-emerald-600',
  // Deshabilitado: gris
  'disabled:cursor-not-allowed disabled:border-neutral-100 disabled:bg-neutral-50 disabled:checked:border-neutral-100',
];

/* ══ RADIO · opción de un grupo, con su texto ══ */
/* Los radios de un mismo grupo comparten `name`; el navegador se encarga de que solo uno quede marcado */

export function Radio({ disabled = false, className, children, ...props }: RadioProps) {
  return (
    <label
      className={cn(
        'group inline-flex min-h-11 cursor-pointer items-center gap-2 text-body text-navy-900',
        disabled && 'cursor-not-allowed text-neutral-300',
        className,
      )}
    >
      <span className="relative grid size-5 shrink-0 place-items-center">
        <input {...props} type="radio" disabled={disabled} className={cn(circle)} />
        {/* Punto: aparece al seleccionar; pointer-events-none deja que el clic llegue al input */}
        <span
          className="pointer-events-none absolute hidden size-2.5 rounded-full bg-emerald-600 peer-checked:block peer-disabled:bg-neutral-300"
          aria-hidden="true"
        />
      </span>

      {children}
    </label>
  );
}
