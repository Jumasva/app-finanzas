import { ArrowDownRightIcon, ArrowUpRightIcon } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';
import { formatMoney } from '@/lib/format';

export type AmountType = 'income' | 'expense' | 'neutral';
type Size = 'sm' | 'base' | 'lg' | 'display';

type AmountProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  value: number;
  type?: AmountType;
  size?: Size;
  // Flecha opcional, solo en sm y base
  arrow?: boolean;
};

/* ══ CLASES · Figma › Atomic Design › Amount ══ */
/* El signo siempre acompaña al color, para que se entienda sin depender del rojo y el verde */

// Lo usa también Amount entry (M15), para que el monto que se escribe se vea igual al que se muestra
export const amountTypes: Record<AmountType, { color: string; sign: string }> = {
  income: { color: 'text-green-700', sign: '+' },
  expense: { color: 'text-red-700', sign: '-' },
  neutral: { color: 'text-content-primary', sign: '' },
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
        amountTypes[type].color,
        className,
      )}
      {...props}
    >
      {showArrow && <ArrowIcon className={sizes[size].arrow} />}
      {amountTypes[type].sign}
      {formatMoney(value)}
    </span>
  );
}
