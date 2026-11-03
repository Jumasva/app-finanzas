import type { IconComponent } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type Color = 'amber' | 'blue' | 'green' | 'teal' | 'red' | 'indigo' | 'emerald' | 'navy';
type Size = 32 | 40;
type Shape = 'circle' | 'square';

type CategoryIconProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  icon: IconComponent;
  color: Color;
  size?: Size;
  shape?: Shape;
  // Solo si el ícono va sin el nombre de la categoría al lado
  label?: string;
};

/* ══ CLASES · Figma › Atomic Design › Category icon ══ */
/* Cada categoría tiene un color fijo de la paleta. Fondo color/100, ícono color/700 (contraste ≥ 4.5:1) */

const colors: Record<Color, string> = {
  amber: 'bg-amber-100 text-amber-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  teal: 'bg-teal-100 text-teal-700',
  red: 'bg-red-100 text-red-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  navy: 'bg-navy-100 text-navy-700',
};

const sizes: Record<Size, { box: string; icon: 16 | 20 }> = {
  32: { box: 'size-8', icon: 16 },
  40: { box: 'size-10', icon: 20 },
};

const shapes: Record<Shape, string> = {
  circle: 'rounded-full',
  square: 'rounded-md',
};

/* ══ CATEGORYICON · ícono de la categoría de un movimiento ══ */

export function CategoryIcon({
  icon: Icon,
  color,
  size = 40,
  shape = 'circle',
  label,
  className,
  ...props
}: CategoryIconProps) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn('grid shrink-0 place-items-center', sizes[size].box, colors[color], shapes[shape], className)}
      {...props}
    >
      <Icon size={sizes[size].icon} />
    </span>
  );
}
