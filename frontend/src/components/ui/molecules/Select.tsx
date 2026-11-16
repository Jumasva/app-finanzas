'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { CheckIcon, ChevronDownIcon, type IconComponent } from '@/components/ui/atoms/icons';
import { useDismiss } from '@/components/ui/hooks/useDismiss';
import { FieldShell, helperIdFor, type FieldShellProps } from '@/components/ui/molecules/FieldShell';
import { cn } from '@/lib/cn';

export type SelectOption = {
  value: string;
  label: string;
  // Lo que va a la izquierda del texto: un CategoryIcon de 24, una bandera…
  leading?: React.ReactNode;
};

type Size = 'md' | 'lg';

type SelectProps = FieldShellProps & {
  options: readonly SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  // Ícono fijo a la izquierda cuando la opción elegida no trae el suyo
  icon?: IconComponent;
  size?: Size;
  // Para enviarlo en un <form>: va en un input oculto
  name?: string;
  id?: string;
};

/* ══ CLASES · Figma › Molecules › M13 Select ══ */
/* Misma caja que el Input (borde 1.5, radio 10, alto 48 en lg y 40 en md). El menú es el de M14 */

const sizes: Record<Size, string> = {
  md: 'h-10 rounded-sm px-3 text-body-lg md:text-body',
  lg: 'h-12 rounded-md px-3.5 text-body-lg',
};

function boxState({ open, invalid, disabled }: { open: boolean; invalid: boolean; disabled: boolean }) {
  if (disabled) return 'cursor-not-allowed border-border-subtle bg-background-subtle text-content-disabled';
  if (invalid) return 'border-danger ring-3 ring-danger-light';
  if (open) return 'border-border-focus ring-3 ring-emerald-100';
  return 'border-border-default hover:border-neutral-500';
}

/* ══ SELECT · elegir una opción de una lista (cuenta, categoría, moneda) ══ */
/* Patrón «select-only combobox» de WAI-ARIA: el foco se queda en el botón y aria-activedescendant
   marca la opción. Flechas, Inicio, Fin, Enter y Escape; escribir una letra salta a la opción que empieza con ella */

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Selecciona una opción',
  icon: Icon,
  size = 'lg',
  name,
  id,
  label,
  helper,
  error,
  required,
  optional,
  disabled = false,
  className,
}: SelectProps) {
  const generatedId = useId();
  const buttonId = id ?? generatedId;
  const listId = `${buttonId}-list`;
  const optionId = (index: number) => `${buttonId}-option-${index}`;

  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex];
  const close = useCallback(() => setOpen(false), []);
  useDismiss(root, open, close);

  function openList() {
    setActive(Math.max(selectedIndex, 0));
    setOpen(true);
  }

  function choose(index: number) {
    onChange(options[index].value);
    setOpen(false);
  }

  function moveTo(index: number) {
    const next = Math.min(Math.max(index, 0), options.length - 1);
    setActive(next);
    document.getElementById(optionId(next))?.scrollIntoView({ block: 'nearest' });
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openList();
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveTo(active + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveTo(active - 1);
        break;
      case 'Home':
        event.preventDefault();
        moveTo(0);
        break;
      case 'End':
        event.preventDefault();
        moveTo(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        choose(active);
        break;
      case 'Escape':
        event.preventDefault();
        setOpen(false);
        break;
      case 'Tab':
        setOpen(false);
        break;
      default:
        // Una letra: la siguiente opción que empieza con ella
        if (event.key.length === 1) {
          const letter = event.key.toLocaleLowerCase('es-CO');
          const start = active + 1;
          const order = [...options.slice(start), ...options.slice(0, start)];
          const match = order.find((option) => option.label.toLocaleLowerCase('es-CO').startsWith(letter));
          if (match) moveTo(options.indexOf(match));
        }
    }
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
      <div ref={root} className="relative">
        <button
          id={buttonId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open ? optionId(active) : undefined}
          aria-invalid={Boolean(error) || undefined}
          aria-required={required || undefined}
          aria-describedby={error || helper ? helperIdFor(buttonId) : undefined}
          disabled={disabled}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
          className={cn(
            'flex w-full items-center gap-2.5 border-[1.5px] bg-background-page text-left transition-colors',
            sizes[size],
            boxState({ open, invalid: Boolean(error), disabled }),
          )}
        >
          {selected?.leading ??
            (Icon && (
              <Icon className={cn('size-[18px]', disabled ? 'text-content-disabled' : 'text-content-tertiary')} />
            ))}
          <span
            className={cn(
              'min-w-0 flex-1 truncate',
              !selected && 'text-content-tertiary',
              selected && !disabled && 'text-content-primary',
            )}
          >
            {selected?.label ?? placeholder}
          </span>
          <ChevronDownIcon
            className={cn(
              'size-[18px] transition-transform',
              disabled ? 'text-content-disabled' : 'text-content-secondary',
              open && 'rotate-180 text-brand-primary',
            )}
          />
        </button>

        {name && <input type="hidden" name={name} value={value ?? ''} />}

        <ul
          id={listId}
          role="listbox"
          aria-labelledby={label ? undefined : buttonId}
          aria-label={label}
          hidden={!open}
          className="absolute top-full right-0 left-0 z-40 mt-1.5 max-h-72 overflow-y-auto rounded-lg border border-border-subtle bg-background-page p-1 shadow-elevation-2"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                // El clic no debe quitarle el foco al botón
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(index)}
                onMouseMove={() => setActive(index)}
                className={cn(
                  'flex h-10 cursor-pointer items-center gap-2.5 rounded-sm px-3 text-body text-content-primary',
                  index === active && 'bg-background-subtle',
                  isSelected && 'bg-background-brand-subtle font-semibold',
                )}
              >
                {option.leading}
                <span className="min-w-0 flex-1 truncate">{option.label}</span>
                {isSelected && <CheckIcon size={16} className="text-brand-primary" />}
              </li>
            );
          })}
        </ul>
      </div>
    </FieldShell>
  );
}
