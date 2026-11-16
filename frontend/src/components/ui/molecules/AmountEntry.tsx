'use client';

import { useId } from 'react';
import { HelperText } from '@/components/ui/atoms/HelperText';
import { cn } from '@/lib/cn';

type Kind = 'expense' | 'income' | 'neutral';

type AmountEntryProps = {
  // Solo dígitos, en unidades enteras de la moneda: '186400'. Vacío mientras no se escriba nada
  value: string;
  onValueChange: (value: string) => void;
  kind?: Kind;
  label?: string;
  // «COP · Peso colombiano»: la moneda principal del usuario
  currency?: string;
  error?: string;
  name?: string;
  autoFocus?: boolean;
  className?: string;
};

/* ══ CLASES · Figma › Molecules › M15 Amount entry ══ */
/* El monto grande del formulario de movimiento. El signo acompaña al color (gasto −, ingreso +) */

const kinds: Record<Kind, { color: string; sign: string }> = {
  expense: { color: 'text-red-700', sign: '-' },
  income: { color: 'text-green-700', sign: '+' },
  neutral: { color: 'text-content-primary', sign: '' },
};

const thousands = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0, useGrouping: 'always' });

/* ══ AMOUNTENTRY · monto que se escribe con el teclado numérico y se ve con puntos de miles ══ */

export function AmountEntry({
  value,
  onValueChange,
  kind = 'expense',
  label = 'Monto',
  currency = 'COP · Peso colombiano',
  error,
  name,
  autoFocus,
  className,
}: AmountEntryProps) {
  const id = useId();
  const digits = value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  const display = digits ? thousands.format(Number(digits)) : '';
  const { color, sign } = kinds[kind];

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1 border-b px-4 py-5',
        error ? 'border-danger' : 'border-border-subtle focus-within:border-brand-primary',
        className,
      )}
    >
      <label htmlFor={id} className="text-label-sm text-content-secondary">
        {label}
      </label>

      <div
        className={cn(
          'flex items-baseline font-heading text-display tabular-nums',
          digits ? color : 'text-content-tertiary',
        )}
      >
        {digits && sign && <span aria-hidden="true">{sign}</span>}
        <span aria-hidden="true">$</span>
        <input
          id={id}
          name={name}
          inputMode="numeric"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder="0"
          value={display}
          onChange={(event) => onValueChange(event.target.value.replace(/\D/g, ''))}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          // El ancho sigue al texto: ch cuenta caracteres de la fuente
          style={{ width: `${Math.max(display.length, 1) + 0.5}ch` }}
          className="min-w-0 bg-transparent text-center outline-none placeholder:text-content-tertiary"
        />
      </div>

      <span className="text-label-sm text-content-tertiary">{currency}</span>

      {error && (
        <HelperText id={`${id}-error`} variant="error" className="mt-1">
          {error}
        </HelperText>
      )}
    </div>
  );
}
