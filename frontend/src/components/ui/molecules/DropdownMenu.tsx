'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { LoaderIcon, MoreHorizontalIcon, type IconComponent } from '@/components/ui/atoms/icons';
import { useDismiss } from '@/components/ui/hooks/useDismiss';
import { cn } from '@/lib/cn';

export type DropdownMenuItem =
  | {
      label: string;
      icon?: IconComponent;
      // Con href es un enlace; sin href, un botón que llama a onSelect
      href?: string;
      onSelect?: () => void;
      // Acción destructiva (Anular, Cerrar sesión): rojo, siempre al final y después de un divisor
      danger?: boolean;
      disabled?: boolean;
      // Mientras la acción corre: spinner en lugar del ícono y el menú sigue abierto
      loading?: boolean;
      // No cerrar el menú al elegirla (Cerrar sesión espera la respuesta de la API)
      keepOpen?: boolean;
    }
  | 'divider';

type DropdownMenuProps = {
  items: readonly DropdownMenuItem[];
  // Nombre del botón y del menú: «Acciones de Mercado Éxito»
  label: string;
  // Lo que se ve en el botón. Sin esto, el botón ⋯ de 32 × 32
  trigger?: React.ReactNode;
  triggerClassName?: string;
  // Arriba de las opciones (quién tiene la sesión) y debajo (un error)
  header?: React.ReactNode;
  footer?: React.ReactNode;
  align?: 'start' | 'end';
  className?: string;
};

/* ══ CLASES · Figma › Molecules › M14 Dropdown menu ══ */
/* 240 px de ancho, radio 12, sombra nivel 2, opciones de 40 px con ícono de 18 */

const itemClass =
  'flex h-10 w-full items-center gap-3 rounded-sm px-3 text-body text-content-primary outline-none transition-colors hover:bg-background-subtle focus-visible:bg-background-subtle disabled:cursor-not-allowed disabled:text-content-disabled';

const dangerClass = 'text-danger-dark hover:bg-danger-light focus-visible:bg-danger-light';

// Las opciones que reciben el foco con las flechas (las deshabilitadas se saltan)
function menuItems(menu: HTMLElement | null) {
  return Array.from(menu?.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)') ?? []);
}

/* ══ DROPDOWNMENU · lista de acciones que se abre desde un botón (⋯) o desde el user menu ══ */
/* Patrón «menu button» de WAI-ARIA: flechas para moverse, Inicio y Fin, Escape cierra y devuelve el foco al botón */

export function DropdownMenu({
  items,
  label,
  trigger,
  triggerClassName,
  header,
  footer,
  align = 'end',
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = useCallback(({ returnFocus = false } = {}) => {
    setOpen(false);
    if (returnFocus) button.current?.focus();
  }, []);
  const dismiss = useCallback(() => close(), [close]);
  useDismiss(root, open, dismiss);

  // Al abrir, el foco pasa a la primera opción
  useEffect(() => {
    if (open) menuItems(menu.current)[0]?.focus();
  }, [open]);

  function onMenuKeyDown(event: React.KeyboardEvent) {
    const list = menuItems(menu.current);
    const index = list.indexOf(document.activeElement as HTMLElement);
    const focus = (i: number) => list[(i + list.length) % list.length]?.focus();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focus(index + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focus(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focus(0);
        break;
      case 'End':
        event.preventDefault();
        focus(list.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        close({ returnFocus: true });
        break;
      case 'Tab':
        // Tab sale del menú hacia el siguiente elemento de la página
        close();
        break;
    }
  }

  return (
    <div ref={root} className={cn('relative inline-flex', className)}>
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        className={cn(
          !trigger &&
            'grid size-8 place-items-center rounded-sm text-content-secondary transition-colors hover:bg-background-subtle hover:text-content-primary',
          open && !trigger && 'bg-background-subtle text-content-primary',
          triggerClassName,
        )}
      >
        {trigger ?? <MoreHorizontalIcon size={16} />}
      </button>

      {open && (
        <div
          ref={menu}
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          className={cn(
            'absolute top-full z-40 mt-2 flex w-60 flex-col rounded-lg border border-border-subtle bg-background-page p-1.5 shadow-elevation-2',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {header && (
            // No es una opción: el lector lo salta con las flechas
            <div role="none" className="border-b border-border-subtle px-3 pt-1.5 pb-2.5">
              {header}
            </div>
          )}

          <div role="none" className={cn('flex flex-col', header && 'pt-1.5')}>
            {items.map((item, index) =>
              item === 'divider' ? (
                <div key={`divider-${index}`} role="separator" className="my-1.5 h-px bg-border-subtle" />
              ) : (
                <MenuItem
                  key={item.label}
                  item={item}
                  onDone={() => {
                    if (!item.keepOpen) close({ returnFocus: !item.href });
                  }}
                />
              ),
            )}
          </div>

          {footer}
        </div>
      )}
    </div>
  );
}

function MenuItem({ item, onDone }: { item: Exclude<DropdownMenuItem, 'divider'>; onDone: () => void }) {
  const Icon = item.loading ? LoaderIcon : item.icon;
  const content = (
    <>
      {Icon && (
        <Icon
          className={cn(
            'size-[18px]',
            item.loading && 'animate-spin',
            !item.danger && !item.disabled && 'text-content-secondary',
          )}
        />
      )}
      {item.label}
    </>
  );
  const className = cn(itemClass, item.danger && dangerClass);

  // tabIndex -1: dentro del menú se navega con las flechas, no con Tab
  if (item.href && !item.disabled) {
    return (
      <Link href={item.href} role="menuitem" tabIndex={-1} onClick={onDone} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={item.disabled || item.loading}
      aria-busy={item.loading || undefined}
      onClick={() => {
        item.onSelect?.();
        onDone();
      }}
      className={className}
    >
      {content}
    </button>
  );
}
