'use client';

import { cloneElement, useId, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

type Placement = 'top' | 'bottom' | 'left' | 'right';

type TooltipProps = {
  content: string;
  placement?: Placement;
  // El elemento que lo activa: debe poder enfocarse (un botón, un enlace)
  children: React.ReactElement<{ 'aria-describedby'?: string }>;
};

/* ══ CLASES · Figma › Atomic Design › Tooltip ══ */
/* Texto corto de ayuda al pasar el mouse o enfocar. Nunca para información importante: en móvil no hay hover */

// Caja: separada 4 px del trigger + 6 px de flecha = 10 px (2.5)
const placements: Record<Placement, string> = {
  top: 'bottom-full left-1/2 mb-2.5 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2.5 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2.5 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2.5 -translate-y-1/2',
};

// Flecha de 6 px: un triángulo hecho con bordes, pegado al lado que mira al trigger
const arrows: Record<Placement, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-navy-900',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-x-[6px] border-b-[6px] border-x-transparent border-b-navy-900',
  left: 'left-full top-1/2 -translate-y-1/2 border-y-[6px] border-l-[6px] border-y-transparent border-l-navy-900',
  right: 'right-full top-1/2 -translate-y-1/2 border-y-[6px] border-r-[6px] border-y-transparent border-r-navy-900',
};

// Aparece a los 300 ms; se va al instante
const DELAY = 300;

/* ══ TOOLTIP · envuelve al trigger y muestra el texto encima ══ */

export function Tooltip({ content, placement = 'top', children }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function show() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), DELAY);
  }

  function hide() {
    clearTimeout(timer.current);
    setOpen(false);
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      // Escape lo cierra sin mover el foco (WCAG 1.4.13)
      onKeyDown={(event) => event.key === 'Escape' && hide()}
    >
      {/* aria-describedby: el lector lee el texto del tooltip al enfocar el trigger */}
      {cloneElement(children, { 'aria-describedby': id })}

      {/* Siempre en el HTML (para aria-describedby); solo se muestra con open */}
      <span
        id={id}
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-50 w-max max-w-[200px] rounded-sm bg-navy-900 px-2.5 py-1.5 text-label-sm text-white',
          placements[placement],
          !open && 'hidden',
        )}
      >
        {content}
        <span className={cn('absolute size-0', arrows[placement])} aria-hidden="true" />
      </span>
    </span>
  );
}
