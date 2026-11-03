import { cn } from '@/lib/cn';

type Variant = 'soft' | 'solid' | 'outline';
type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'complementary' | 'brand';

type BadgeProps = React.ComponentProps<'span'> & {
  variant?: Variant;
  tone?: Tone;
  dot?: boolean;
};

/* ══ CLASES · Figma › Atomic Design › Badge ══ */

// Todas las formas llevan borde (transparente si no se ve) para que midan lo mismo
const base = 'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-label whitespace-nowrap';

// Primero la forma y luego el color: variants[variant][tone]
const variants: Record<Variant, Record<Tone, string>> = {
  soft: {
    success: 'border-transparent bg-green-50 text-green-800',
    warning: 'border-transparent bg-amber-50 text-amber-800',
    danger: 'border-transparent bg-red-50 text-red-800',
    info: 'border-transparent bg-blue-50 text-blue-800',
    neutral: 'border-transparent bg-neutral-50 text-neutral-800',
    complementary: 'border-transparent bg-indigo-50 text-indigo-800',
    brand: 'border-transparent bg-emerald-50 text-emerald-800',
  },
  solid: {
    success: 'border-transparent bg-green-600 text-white',
    warning: 'border-transparent bg-amber-600 text-white',
    danger: 'border-transparent bg-red-600 text-white',
    info: 'border-transparent bg-blue-600 text-white',
    neutral: 'border-transparent bg-neutral-600 text-white',
    complementary: 'border-transparent bg-indigo-600 text-white',
    brand: 'border-transparent bg-emerald-600 text-white',
  },
  outline: {
    success: 'border-green-600 bg-transparent text-green-600',
    warning: 'border-amber-600 bg-transparent text-amber-600',
    danger: 'border-red-600 bg-transparent text-red-600',
    info: 'border-blue-600 bg-transparent text-blue-600',
    neutral: 'border-neutral-600 bg-transparent text-neutral-600',
    complementary: 'border-indigo-600 bg-transparent text-indigo-600',
    brand: 'border-emerald-600 bg-transparent text-emerald-600',
  },
};

/* ══ BADGE · etiqueta corta de estado o categoría ══ */

export function Badge({ variant = 'soft', tone = 'neutral', dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(base, variants[variant][tone], className)} {...props}>
      {/* Punto opcional: toma el color del texto (bg-current), así se ve en cualquier forma */}
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
