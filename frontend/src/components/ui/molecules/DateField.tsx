'use client';

import { useId, useRef } from 'react';
import { CalendarIcon } from '@/components/ui/atoms/icons';
import { usePopover } from '@/components/ui/hooks/usePopover';
import { describedBy, FieldShell, type FieldShellProps } from '@/components/ui/molecules/FieldShell';
import { DatePicker } from '@/components/ui/organisms/DatePicker';
import { fieldBase, fieldIconSizes, fieldIconState, fieldSizes, fieldState } from '@/components/ui/styles';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/date';

type DateFieldProps = Omit<FieldShellProps, 'success' | 'labelAction'> & {
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
/* La caja del Input lg con el calendario a la izquierda. Al abrir muestra el Date picker */

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
  const button = useRef<HTMLButtonElement>(null);
  const { open, setOpen, root } = usePopover();
  const invalid = Boolean(error);

  function close() {
    setOpen(false);
    button.current?.focus();
  }

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
            close();
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
          aria-describedby={describedBy(buttonId, { helper, error })}
          onClick={() => setOpen((current) => !current)}
          className={cn(
            'group text-left outline-none',
            fieldBase,
            fieldSizes.lg,
            fieldState({ invalid, disabled, open }),
          )}
        >
          <CalendarIcon className={cn(fieldIconSizes.lg, fieldIconState({ invalid, disabled, open }))} />
          <span
            className={cn(
              'flex-1 tabular-nums',
              disabled ? 'text-content-disabled' : value ? 'text-content-primary' : 'text-content-tertiary',
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
                close();
              }}
            />
          </div>
        )}
      </div>
    </FieldShell>
  );
}
