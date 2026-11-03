import { cn } from '@/lib/cn';

type Orientation = 'horizontal' | 'vertical';

type DividerProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  orientation?: Orientation;
  // Empieza después del ícono (44 px), en listas con ícono
  inset?: boolean;
  // Texto en medio de la línea: «o continúa con»
  label?: string;
};

/* ══ CLASES · Figma › Atomic Design › Divider ══ */
/* Línea de 1 px, neutral/100. Úsalo solo cuando el espacio en blanco no alcanza.
   El margen (16 a 24 px) lo pone quien lo usa: es posición, no parte del átomo */

const line = 'shrink-0 bg-neutral-100';

/* ══ DIVIDER · horizontal, vertical, con texto o inset ══ */

export function Divider({ orientation = 'horizontal', inset = false, label, className, ...props }: DividerProps) {
  // Con texto: dos líneas y el texto en medio (12 px, gap 12 px).
  // Sin role="separator": ese rol esconde su contenido y el lector no leería el texto
  if (label) {
    return (
      <div className={cn('flex items-center gap-3 text-body-sm text-neutral-500', className)} {...props}>
        <span className={cn(line, 'h-px flex-1')} aria-hidden="true" />
        {label}
        <span className={cn(line, 'h-px flex-1')} aria-hidden="true" />
      </div>
    );
  }

  // Vertical: alto de 20 px (Figma: 16 a 24); se cambia con className
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(line, 'h-5 w-px self-center', className)}
        {...props}
      />
    );
  }

  return <div role="separator" className={cn(line, 'h-px w-full', inset && 'ml-11 w-auto', className)} {...props} />;
}
