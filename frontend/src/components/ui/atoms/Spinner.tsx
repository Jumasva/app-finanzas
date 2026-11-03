import { cn } from '@/lib/cn';

type Size = 16 | 20 | 24 | 32;
type Color = 'brand' | 'on-primary' | 'neutral';

type SpinnerProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  size?: Size;
  color?: Color;
  // Lo que lee el lector de pantalla
  label?: string;
};

/* ══ CLASES · Figma › Atomic Design › Spinner & Skeleton ══ */
/* Spinner para acciones cortas (guardar, enviar). 16 botón small · 20 botón, input · 24 tarjeta · 32 pantalla */

// Arco de color sobre un riel (track) más claro
const colors: Record<Color, { arc: string; track: string }> = {
  brand: { arc: 'stroke-emerald-600', track: 'stroke-neutral-100' },
  'on-primary': { arc: 'stroke-white', track: 'stroke-white/30' },
  neutral: { arc: 'stroke-neutral-500', track: 'stroke-neutral-100' },
};

/* ══ SPINNER · indicador de carga circular ══ */

export function Spinner({ size = 20, color = 'brand', label = 'Cargando', className, ...props }: SpinnerProps) {
  // Trazo 2 px, y 3 px desde 24 (en las unidades del lienzo de 24)
  const stroke = ((size >= 24 ? 3 : 2) * 24) / size;
  const radius = 12 - stroke / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <span role="status" aria-label={label} className={cn('inline-flex shrink-0', className)} {...props}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden="true">
        <circle cx="12" cy="12" r={radius} strokeWidth={stroke} className={colors[color].track} />
        {/* Un cuarto de la vuelta en color */}
        <circle
          cx="12"
          cy="12"
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference / 4} ${circumference}`}
          className={colors[color].arc}
        />
      </svg>
    </span>
  );
}
