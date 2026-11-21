'use client';

import { useId } from 'react';
import { amountTypes, type AmountType } from '@/components/ui/atoms/Amount';
import { HelperText } from '@/components/ui/atoms/HelperText';
import { cn } from '@/lib/cn';
import { formatNumber } from '@/lib/format';

type AmountEntryProps = {
  // Solo dígitos, en unidades enteras de la moneda: '186400'. Vacío mientras no se escriba nada
  value: string;
  onValueChange: (value: string) => void;
  // Los mismos tipos de Amount: gasto (−, rojo), ingreso (+, verde) o neutral
  type?: AmountType;
  label?: string;
  // «COP · Peso colombiano»: la moneda principal del usuario
  currency?: string;
  error?: string;
  name?: string;
  autoFocus?: boolean;
  className?: string;
};

/* ══ AMOUNTENTRY · Figma › Molecules › M15 Amount entry ══ */
/* El monto grande del formulario de movimiento: se escribe con el teclado numérico y se ve con puntos de miles.
   Color y signo son los del átomo Amount, para que se vea igual que al mostrarlo */

export function AmountEntry({
  value,
  onValueChange,
  type = 'expense',
  label = 'Monto',
  currency = 'COP · Peso colombiano',
  error,
  name,
  autoFocus,
  className,
}: AmountEntryProps) {
  const id = useId();
  const digits = value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  const display = digits ? formatNumber(Number(digits)) : '';
  const { color, sign } = amountTypes[type];

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
