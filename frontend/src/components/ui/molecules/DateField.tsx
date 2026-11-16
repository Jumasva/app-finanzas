'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { CalendarIcon } from '@/components/ui/atoms/icons';
import { useDismiss } from '@/components/ui/hooks/useDismiss';
import { FieldShell, helperIdFor, type FieldShellProps } from '@/components/ui/molecules/FieldShell';
import { DatePicker } from '@/components/ui/organisms/DatePicker';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/date';

type DateFieldProps = FieldShellProps & {
  // YYYY-MM-DD, como lo pide el contrato
  value: string | null;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  placeholder?: string;
  name?: string;
  id?: string;
};

/* ══ DATEFIELD · Figma › Molecules › M15 Date field ══ */
/* Caja de 48 px como el Input lg, con el calendario a la izquierda. Al abrir muestra el Date picker */

export function DateField({
  value,
  onChange,
  min,
  max,
  placeholder = 'dd/mm/aaaa',
  name,
  id,
  label,
  helper,
  error,
  required,
  optional,
  disabled = false,
  className,
}: DateFieldProps) {
  const generatedId = useId();
  const buttonId = id ?? generatedId;
  const dialogId = `${buttonId}-calendar`;
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(root, open, close);

  return (
    <FieldShell
      id={buttonId}
      label={label}
      helper={helper}
      error={error}
      required={required}
      optional={optional}
      disabled={disabled}
      className={className}
    >
      <div
        ref={root}
        className="relative"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && open) {
            event.preventDefault();
            setOpen(false);
            button.current?.focus();
          }
        }}
      >
        <button
          ref={button}
          id={buttonId}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? dialogId : undefined}
          aria-describedby={error || helper ? helperIdFor(buttonId) : undefined}
          onClick={() => setOpen((current) => !current)}
          className={cn(
            'flex h-12 w-full items-center gap-2.5 rounded-md border-[1.5px] bg-background-page px-3.5 text-left text-body-lg transition-colors',
            disabled && 'cursor-not-allowed border-border-subtle bg-background-subtle text-content-disabled',
            !disabled && error && 'border-danger ring-3 ring-danger-light',
            !disabled && !error && open && 'border-border-focus ring-3 ring-emerald-100',
            !disabled && !error && !open && 'border-border-default hover:border-neutral-500',
          )}
        >
          <CalendarIcon
            className={cn(
              'size-5',
              disabled ? 'text-content-disabled' : open ? 'text-brand-primary' : 'text-content-tertiary',
            )}
          />
          <span
            className={cn(
              'flex-1 tabular-nums',
              !value && 'text-content-tertiary',
              value && !disabled && 'text-content-primary',
            )}
          >
            {value ? formatDate(value) : placeholder}
          </span>
        </button>

        {name && <input type="hidden" name={name} value={value ?? ''} />}

        {open && (
          <div
            id={dialogId}
            role="dialog"
            aria-label={label ?? 'Elegir fecha'}
            className="absolute top-full left-0 z-40 mt-1.5"
          >
            <DatePicker
              value={value}
              min={min}
              max={max}
              autoFocus
              onChange={(date) => {
                onChange(date);
                setOpen(false);
                button.current?.focus();
              }}
            />
          </div>
        )}
      </div>
    </FieldShell>
  );
}
