'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { FilterIcon, XIcon } from '@/components/ui/atoms/icons';
import { Input } from '@/components/ui/atoms/Input';
import { cn } from '@/lib/cn';

type SearchBarProps = Omit<React.ComponentProps<typeof Input>, 'type' | 'value' | 'onChange' | 'suffix'> & {
  value: string;
  onValueChange: (value: string) => void;
  // Nombre accesible del campo: el placeholder no lo reemplaza
  label?: string;
  // Botón de filtros al lado. filtersActive pone el punto verde
  onFiltersClick?: () => void;
  filtersActive?: boolean;
  // Ctrl + K (⌘ + K en Mac) enfoca la búsqueda en desktop
  shortcut?: boolean;
};

/* ══ SEARCHBAR · Figma › Molecules › M02 Search bar ══ */
/* Input de búsqueda de 40 px; la x para limpiar aparece cuando hay texto. Controlado: quien lo usa guarda el texto */

export function SearchBar({
  value,
  onValueChange,
  label = 'Buscar',
  placeholder = 'Buscar movimientos',
  onFiltersClick,
  filtersActive = false,
  shortcut = false,
  disabled,
  className,
  ...props
}: SearchBarProps) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!shortcut) return;
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        input.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shortcut]);

  function clear() {
    onValueChange('');
    input.current?.focus();
  }

  return (
    <div role="search" className={cn('flex items-center gap-3', className)}>
      <Input
        {...props}
        ref={input}
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={(event) => {
          // Escape borra lo escrito, como en los buscadores del sistema
          if (event.key === 'Escape' && value) {
            event.preventDefault();
            clear();
          }
          props.onKeyDown?.(event);
        }}
        aria-label={label}
        placeholder={placeholder}
        disabled={disabled}
        suffix={
          value &&
          !disabled && (
            <button
              type="button"
              onClick={clear}
              aria-label="Limpiar búsqueda"
              className="grid size-6 shrink-0 place-items-center rounded-full text-content-tertiary hover:bg-background-subtle hover:text-content-primary"
            >
              <XIcon size={16} />
            </button>
          )
        }
      />

      {onFiltersClick && (
        <span className="relative shrink-0">
          <Button
            variant="secondary"
            iconLeft={FilterIcon}
            onClick={onFiltersClick}
            disabled={disabled}
            aria-label={filtersActive ? 'Filtros (hay filtros activos)' : 'Filtros'}
            className="border-border-default text-content-secondary"
          />
          {filtersActive && (
            <span
              aria-hidden="true"
              className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brand-primary ring-2 ring-background-page"
            />
          )}
        </span>
      )}
    </div>
  );
}
