'use client';

import { useRef } from 'react';
import { moveIndex } from '@/components/ui/hooks/moveIndex';
import { cn } from '@/lib/cn';

export type SegmentOption<T extends string> = { value: T; label: string };

type Size = 'md' | 'sm';

type SegmentedControlProps<T extends string> = {
  // De 2 a 5 opciones, todas del mismo ancho
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  // Nombre del grupo para el lector de pantalla: «Tipo de movimiento»
  label: string;
  size?: Size;
  className?: string;
};

/* ══ CLASES · Figma › Molecules › M03 Segmented control ══ */

const sizes: Record<Size, { box: string; option: string }> = {
  md: { box: 'h-10', option: 'px-4 text-body' },
  sm: { box: 'h-8', option: 'px-3 text-body-sm' },
};

/* ══ SEGMENTEDCONTROL · cambia la vista del mismo contenido (Gastos / Ingresos, Mes / Año) ══ */
/* Es un grupo de radios (WAI-ARIA radiogroup): Tab entra a la opción activa y las flechas cambian de opción */

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  size = 'md',
  className,
}: SegmentedControlProps<T>) {
  const group = useRef<HTMLDivElement>(null);

  function onKeyDown(event: React.KeyboardEvent) {
    const index = options.findIndex((option) => option.value === value);
    const next = moveIndex(event.key, index, options.length);
    if (next === undefined) return;
    event.preventDefault();

    onChange(options[next].value);
    group.current?.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus();
  }

  return (
    <div
      ref={group}
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn(
        'inline-grid auto-cols-fr grid-flow-col rounded-md bg-background-subtle p-1',
        sizes[size].box,
        className,
      )}
    >
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-sm whitespace-nowrap transition-colors',
              sizes[size].option,
              checked
                ? 'bg-background-page font-semibold text-content-primary shadow-elevation-1'
                : 'text-content-secondary hover:text-content-primary',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
