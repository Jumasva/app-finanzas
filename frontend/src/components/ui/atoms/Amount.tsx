import { ArrowDownRightIcon, ArrowUpRightIcon } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';
import { formatMoney } from '@/lib/format';

type Type = 'income' | 'expense' | 'neutral';
type Size = 'sm' | 'base' | 'lg' | 'display';

type AmountProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  value: number;
  type?: Type;
  size?: Size;
  // Flecha opcional, solo en sm y base
  arrow?: boolean;
};

/* ══ CLASES · Figma › Atomic Design › Amount ══ */
/* El signo siempre acompaña al color, para que se entienda sin depender del rojo y el verde */

const types: Record<Type, { color: string; sign: string }> = {
  income: { color: 'text-green-700', sign: '+' },
  expense: { color: 'text-red-700', sign: '-' },
  neutral: { color: 'text-navy-900', sign: '' },
};

// Cifras tabulares en todos los tamaños
const sizes: Record<Size, { text: string; arrow: string }> = {
  sm: { text: 'text-number', arrow: 'size-3.5' },
  base: { text: 'text-body-lg font-semibold', arrow: 'size-4' },
  lg: { text: 'font-heading text-h2', arrow: '' },
  display: { text: 'font-heading text-display', arrow: '' },
};

/* ══ AMOUNT · muestra dinero con su signo y color ══ */

export function Amount({ value, type = 'neutral', size = 'base', arrow = false, className, ...props }: AmountProps) {
  const ArrowIcon = type === 'income' ? ArrowUpRightIcon : ArrowDownRightIcon;
  const showArrow = arrow && type !== 'neutral' && (size === 'sm' || size === 'base');

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap tabular-nums',
        sizes[size].text,
        types[type].color,
        className,
      )}
      {...props}
    >
      {showArrow && <ArrowIcon className={sizes[size].arrow} />}
      {types[type].sign}
      {formatMoney(value)}
    </span>
  );
}
