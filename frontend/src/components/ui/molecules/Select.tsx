'use client';

import { useId, useState } from 'react';
import { CheckIcon, ChevronDownIcon, type IconComponent } from '@/components/ui/atoms/icons';
import { moveIndex } from '@/components/ui/hooks/moveIndex';
import { usePopover } from '@/components/ui/hooks/usePopover';
import { describedBy, FieldShell, type FieldShellProps } from '@/components/ui/molecules/FieldShell';
import {
  fieldBase,
  fieldIconSizes,
  fieldIconState,
  fieldSizes,
  fieldState,
  listOption,
  popoverPanel,
  type FieldSize,
} from '@/components/ui/styles';
import { cn } from '@/lib/cn';

export type SelectOption = {
  value: string;
  label: string;
  // Lo que va a la izquierda del texto: un CategoryIcon de 24, una bandera…
  leading?: React.ReactNode;
};

type SelectProps = Omit<FieldShellProps, 'success' | 'labelAction'> & {
  options: readonly SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  // Ícono fijo a la izquierda cuando la opción elegida no trae el suyo
  icon?: IconComponent;
  size?: FieldSize;
  // Para enviarlo en un <form>: va en un input oculto
  name?: string;
  id?: string;
};

/* ══ SELECT · Figma › Molecules › M13 Select ══ */
/* Elegir una opción de una lista (cuenta, categoría, moneda). La caja es la del Input y el menú el de M14.
   Patrón «select-only combobox» de WAI-ARIA: el foco se queda en el botón y aria-activedescendant
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

  const { open, setOpen, root } = usePopover();
  const [active, setActive] = useState(0);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex];
  const invalid = Boolean(error);

  function openList() {
    setActive(Math.max(selectedIndex, 0));
    setOpen(true);
  }

  function choose(index: number) {
    onChange(options[index].value);
    setOpen(false);
  }

  function moveTo(index: number) {
    setActive(index);
    document.getElementById(optionId(index))?.scrollIntoView({ block: 'nearest' });
  }

  // La siguiente opción que empieza con la letra escrita
  function findByLetter(key: string) {
    const letter = key.toLocaleLowerCase('es-CO');
    const order = [...options.slice(active + 1), ...options.slice(0, active + 1)];
    const match = order.find((option) => option.label.toLocaleLowerCase('es-CO').startsWith(letter));
    return match ? options.indexOf(match) : undefined;
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openList();
      }
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose(active);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Tab') {
      setOpen(false);
    } else {
      const next =
        moveIndex(event.key, active, options.length, { axis: 'vertical', wrap: false }) ??
        (event.key.length === 1 ? findByLetter(event.key) : undefined);
      if (next === undefined) return;
      event.preventDefault();
      moveTo(next);
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
          aria-invalid={invalid || undefined}
          aria-required={required || undefined}
          aria-describedby={describedBy(buttonId, { helper, error })}
          disabled={disabled}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
          className={cn(
            'group text-left outline-none',
            fieldBase,
            fieldSizes[size],
            fieldState({ invalid, disabled, open }),
          )}
        >
          {selected?.leading ??
            (Icon && <Icon className={cn(fieldIconSizes[size], fieldIconState({ invalid, disabled, open }))} />)}
          <span
            className={cn(
              'min-w-0 flex-1 truncate',
              disabled ? 'text-content-disabled' : selected ? 'text-content-primary' : 'text-content-tertiary',
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
          aria-label={label}
          aria-labelledby={label ? undefined : buttonId}
          hidden={!open}
          className={cn(popoverPanel, 'absolute inset-x-0 top-full z-40 mt-1.5 max-h-72 overflow-y-auto p-1')}
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
                  listOption,
                  'cursor-pointer gap-2.5',
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
