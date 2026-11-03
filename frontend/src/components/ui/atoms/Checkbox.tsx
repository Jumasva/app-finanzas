'use client';

import { useEffect, useRef } from 'react';
import { CheckIcon, MinusIcon } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type CheckboxProps = Omit<React.ComponentProps<'input'>, 'type' | 'ref'> & {
  indeterminate?: boolean;
  invalid?: boolean;
};

/* Caja de 20 px con zona táctil de 44 px que incluye el texto. Para opciones que se confirman con un botón */

const box = [
  // Caja vacía: se le quita el dibujo del navegador y se pinta a mano
  'peer size-5 cursor-pointer appearance-none rounded-[5px] border-[1.5px] bg-background-page transition-colors',
  // Marcado o indeterminado: fondo verde
  'checked:border-brand-primary checked:bg-brand-primary indeterminate:border-brand-primary indeterminate:bg-brand-primary',
  // Hover sobre toda la fila (caja o texto): borde verde sin marcar, verde oscuro marcado
  'enabled:group-hover:border-brand-primary',
  'enabled:group-hover:checked:border-brand-primary-hover enabled:group-hover:checked:bg-brand-primary-hover',
  'enabled:group-hover:indeterminate:border-brand-primary-hover enabled:group-hover:indeterminate:bg-brand-primary-hover',
  // Deshabilitado: gris, marcado o no
  'disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-background-subtle',
  'disabled:checked:border-neutral-100 disabled:checked:bg-neutral-100',
  'disabled:indeterminate:border-neutral-100 disabled:indeterminate:bg-neutral-100',
];

// El check y la raya van encima de la caja; pointer-events-none deja que el clic llegue al input
const mark = 'pointer-events-none absolute hidden size-3.5 text-brand-on-primary';

/* ══ CHECKBOX · casilla con su texto ══ */

export function Checkbox({
  indeterminate = false,
  invalid = false,
  disabled = false,
  className,
  children,
  ...props
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // «indeterminate» no existe como atributo HTML: solo se puede poner desde JavaScript
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={cn(
        'group inline-flex min-h-11 cursor-pointer items-center gap-2 text-body text-content-primary',
        disabled && 'cursor-not-allowed text-content-disabled',
        className,
      )}
    >
      <span className="relative grid size-5 shrink-0 place-items-center">
        <input
          {...props}
          ref={inputRef}
          type="checkbox"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={cn(box, invalid ? 'border-danger' : 'border-border-default')}
        />
        <CheckIcon className={cn(mark, 'peer-[:checked:not(:indeterminate)]:block')} strokeWidth={3} />
        <MinusIcon className={cn(mark, 'peer-indeterminate:block')} strokeWidth={3} />
      </span>

      {children}
    </label>
  );
}