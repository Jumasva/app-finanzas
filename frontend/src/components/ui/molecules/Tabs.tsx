'use client';

import { useId, useRef } from 'react';
import { moveIndex } from '@/components/ui/hooks/moveIndex';
import { cn } from '@/lib/cn';

export type TabItem<T extends string> = { value: T; label: string };

type TabsProps<T extends string> = {
  items: readonly TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  // El contenido de la pestaña activa. Se pinta debajo, conectado con aria-controls
  children?: React.ReactNode;
  className?: string;
};

/* ══ TABS · Figma › Molecules › M03 Tabs ══ */
/* Navega entre secciones de una página. Patrón tablist de WAI-ARIA: las flechas mueven entre pestañas.
   Activa: emerald/700 SemiBold con indicador de 2 px; 24 px entre pestañas; línea base de 1 px */

export function Tabs<T extends string>({ items, value, onChange, label, children, className }: TabsProps<T>) {
  const id = useId();
  const list = useRef<HTMLDivElement>(null);
  const tabId = (item: T) => `${id}-tab-${item}`;
  const panelId = `${id}-panel`;

  function onKeyDown(event: React.KeyboardEvent) {
    const index = items.findIndex((item) => item.value === value);
    const next = moveIndex(event.key, index, items.length, { axis: 'horizontal' });
    if (next === undefined) return;

    event.preventDefault();
    onChange(items[next].value);
    list.current?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  }

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div
        ref={list}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="flex gap-6 overflow-x-auto border-b border-border-subtle"
      >
        {items.map((item) => {
          const selected = item.value === value;
          return (
            <button
              key={item.value}
              id={tabId(item.value)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={children ? panelId : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(item.value)}
              className={cn(
                '-mb-px shrink-0 border-b-2 pb-2.5 text-body whitespace-nowrap transition-colors',
                selected
                  ? 'border-brand-primary font-semibold text-content-link'
                  : 'border-transparent text-content-secondary hover:text-content-primary',
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {children && (
        <div id={panelId} role="tabpanel" aria-labelledby={tabId(value)} tabIndex={0}>
          {children}
        </div>
      )}
    </div>
  );
}
