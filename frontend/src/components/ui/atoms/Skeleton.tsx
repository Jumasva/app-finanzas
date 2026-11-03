import { cn } from '@/lib/cn';

type Shape = 'line' | 'circle' | 'block';

type SkeletonProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  shape?: Shape;
};

/* ══ CLASES · Figma › Atomic Design › Spinner & Skeleton ══ */
/* Skeleton para contenido que está cargando, con la misma forma del contenido real.
   El tamaño se da con className (w-…, h-…, size-…): cada pieza imita algo distinto */

const shapes: Record<Shape, string> = {
  // Línea de texto: 12 px de alto, radio 6 px
  line: 'h-3 w-full rounded-[6px]',
  // Avatar o ícono: círculo de 40 px
  circle: 'size-10 rounded-full',
  // Tarjeta, imagen, monto grande: radio 10
  block: 'h-20 w-full rounded-md',
};

/* ══ SKELETON · pieza gris que reemplaza al contenido mientras carga ══ */

// Es decorativo: quien lo usa marca la zona que carga con aria-busy="true"
export function Skeleton({ shape = 'line', className, ...props }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('block shrink-0 animate-skeleton bg-neutral-50', shapes[shape], className)}
      {...props}
    />
  );
}
