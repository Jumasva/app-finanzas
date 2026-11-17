'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/atoms/icons';
import { iconButton } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import {
  addDays,
  addMonths,
  daysInMonth,
  firstWeekday,
  formatLongDate,
  formatMonth,
  parseIsoDate,
  sameDayInMonth,
  toIsoDate,
  todayIso,
} from '@/lib/date';

type DatePickerProps = {
  // Fechas como texto YYYY-MM-DD, igual que en el contrato
  value: string | null;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  // Atajos de arriba. Por defecto Hoy y Ayer
  presets?: readonly { label: string; value: string }[];
  // Para enfocar el día al abrirse dentro de un Date field
  autoFocus?: boolean;
  className?: string;
};

const WEEKDAYS = [
  { short: 'L', long: 'lunes' },
  { short: 'M', long: 'martes' },
  { short: 'M', long: 'miércoles' },
  { short: 'J', long: 'jueves' },
  { short: 'V', long: 'viernes' },
  { short: 'S', long: 'sábado' },
  { short: 'D', long: 'domingo' },
];

/* ══ DATEPICKER · Figma › Organisms › Date picker ══ */
/* Calendario de 344 px: atajos, mes con flechas y días de 40 × 40 con la semana desde el lunes.
   «Hoy» es la fecha de America/Bogota (RN-GEN-001). Teclado: flechas por día y semana, RePág/AvPág por mes */

export function DatePicker({ value, onChange, min, max, presets, autoFocus = false, className }: DatePickerProps) {
  const today = todayIso();
  const [focused, setFocused] = useState(value ?? today);
  const [view, setView] = useState(() => {
    const { year, month } = parseIsoDate(value ?? today);
    return { year, month };
  });
  const grid = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(autoFocus);

  const shortcuts = presets ?? [
    { label: 'Hoy', value: today },
    { label: 'Ayer', value: addDays(today, -1) },
  ];

  const outOfRange = (date: string) => Boolean((min && date < min) || (max && date > max));

  // Después de moverse con el teclado, el foco sigue al día marcado
  useEffect(() => {
    if (!shouldFocus.current) return;
    grid.current?.querySelector<HTMLElement>(`[data-date="${focused}"]`)?.focus();
  }, [focused, view]);

  function moveFocus(date: string) {
    shouldFocus.current = true;
    setFocused(date);
    const { year, month } = parseIsoDate(date);
    setView({ year, month });
  }

  function changeMonth(months: number) {
    const next = addMonths(view.year, view.month, months);
    setView(next);
    shouldFocus.current = false;
    // El día marcado pasa al mismo número del otro mes (o al último si no existe)
    setFocused(sameDayInMonth(focused, months));
  }

  function onGridKeyDown(event: React.KeyboardEvent) {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (event.key in moves) {
      event.preventDefault();
      moveFocus(addDays(focused, moves[event.key]));
    } else if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      moveFocus(sameDayInMonth(focused, event.key === 'PageUp' ? -1 : 1));
    }
  }

  const blanks = firstWeekday(view.year, view.month);
  const total = daysInMonth(view.year, view.month);
  const days = Array.from({ length: total }, (_, index) => toIsoDate(view.year, view.month, index + 1));
  const monthLabel = formatMonth(view.year, view.month);

  return (
    <div
      className={cn(
        'flex w-[344px] max-w-full flex-col gap-3 rounded-xl border border-border-subtle bg-background-page p-4 shadow-elevation-3',
        className,
      )}
    >
      {shortcuts.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {shortcuts.map((shortcut) => (
            <button
              key={shortcut.label}
              type="button"
              disabled={outOfRange(shortcut.value)}
              onClick={() => onChange(shortcut.value)}
              className={cn(
                'h-8 rounded-sm border px-3 text-body transition-colors disabled:cursor-not-allowed disabled:text-content-disabled',
                shortcut.value === value
                  ? 'border-brand-primary bg-background-brand-subtle font-semibold text-content-link'
                  : 'border-border-subtle text-content-primary hover:bg-background-subtle',
              )}
            >
              {shortcut.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          aria-label="Mes anterior"
          className={cn(iconButton, 'size-8 rounded-sm')}
        >
          <ChevronLeftIcon size={20} />
        </button>
        <span aria-live="polite" className="font-heading text-label-lg text-content-primary">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          aria-label="Mes siguiente"
          className={cn(iconButton, 'size-8 rounded-sm')}
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>

      <div ref={grid} role="grid" aria-label={monthLabel} onKeyDown={onGridKeyDown} className="flex flex-col gap-1">
        <div role="row" className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((weekday) => (
            <span
              key={weekday.long}
              role="columnheader"
              aria-label={weekday.long}
              className="grid h-8 place-items-center text-label-sm text-content-tertiary"
            >
              {weekday.short}
            </span>
          ))}
        </div>

        <div role="row" className="grid grid-cols-7 gap-1">
          {Array.from({ length: blanks }, (_, index) => (
            <span key={`blank-${index}`} role="gridcell" />
          ))}

          {days.map((date) => {
            const selected = date === value;
            const isToday = date === today;
            const disabled = outOfRange(date);
            return (
              <span key={date} role="gridcell" aria-selected={selected}>
                <button
                  type="button"
                  data-date={date}
                  tabIndex={date === focused ? 0 : -1}
                  disabled={disabled}
                  aria-current={isToday ? 'date' : undefined}
                  aria-label={formatLongDate(date)}
                  onClick={() => onChange(date)}
                  className={cn(
                    'grid aspect-square w-full max-w-10 place-items-center rounded-md text-body tabular-nums transition-colors disabled:cursor-not-allowed disabled:text-content-disabled',
                    selected
                      ? 'bg-brand-primary font-semibold text-brand-on-primary'
                      : 'text-content-primary hover:bg-background-subtle',
                    isToday && !selected && 'font-semibold text-content-link ring-1 ring-brand-primary ring-inset',
                  )}
                >
                  {parseIsoDate(date).day}
                </button>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
