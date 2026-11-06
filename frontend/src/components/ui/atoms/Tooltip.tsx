'use client';

import { cloneElement, useEffect, useId, useRef, useState } from 'react';
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

// Caja: separada 4 px del trigger + 6 px de flecha = 10 px
const GAP = 10;

// Va con position: fixed, medida desde el trigger al abrirse. Así no la recorta un contenedor con overflow
// (el Sidebar colapsado, una tabla con scroll) ni lo hace crecer. El translate la centra sobre el punto
const placements: Record<Placement, string> = {
  top: '-translate-x-1/2 -translate-y-full',
  bottom: '-translate-x-1/2',
  left: '-translate-x-full -translate-y-1/2',
  right: '-translate-y-1/2',
};

// El punto del trigger donde se ancla la caja, en coordenadas de la ventana
function anchor(rect: DOMRect, placement: Placement) {
  switch (placement) {
    case 'top':
      return { top: rect.top - GAP, left: rect.left + rect.width / 2 };
    case 'bottom':
      return { top: rect.bottom + GAP, left: rect.left + rect.width / 2 };
    case 'left':
      return { top: rect.top + rect.height / 2, left: rect.left - GAP };
    case 'right':
      return { top: rect.top + rect.height / 2, left: rect.right + GAP };
  }
}

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
  const trigger = useRef<HTMLSpanElement>(null);
  // null: cerrado. Con valor: abierto en esa posición
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function show() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (trigger.current) setPosition(anchor(trigger.current.getBoundingClientRect(), placement));
    }, DELAY);
  }

  function hide() {
    clearTimeout(timer.current);
    setPosition(null);
  }

  // Abierto, se cierra si la página o un contenedor hace scroll, o si cambia el tamaño de la ventana:
  // la posición medida dejaría de coincidir con el trigger
  const open = position !== null;
  useEffect(() => {
    if (!open) return;
    const close = () => setPosition(null);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  // Se limpia el temporizador si el componente se desmonta antes de abrir
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <span
      ref={trigger}
      className="inline-flex"
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
          'pointer-events-none fixed z-50 w-max max-w-[200px] rounded-sm bg-navy-900 px-2.5 py-1.5 text-label-sm text-white',
          placements[placement],
          !open && 'hidden',
        )}
        style={position ?? undefined}
      >
        {content}
        <span className={cn('absolute size-0', arrows[placement])} aria-hidden="true" />
      </span>
    </span>
  );
}
