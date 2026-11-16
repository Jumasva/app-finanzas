import { cn } from '@/lib/cn';

export type DetailItem = { label: string; value: React.ReactNode };

type DetailListProps = {
  items: readonly DetailItem[];
  className?: string;
};

/* ══ DETAILLIST · Figma › Molecules › M21 Detail rows ══ */
/* Filas de 42 px con el dato a la izquierda y el valor a la derecha, separadas por una línea.
   Es una lista de definiciones (<dl>): el lector lee «Fecha: 23 oct 2026» */

export function DetailList({ items, className }: DetailListProps) {
  return (
    <dl className={cn('flex flex-col', className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-h-[42px] items-center justify-between gap-4 border-b border-border-subtle py-2.5 text-body last:border-b-0"
        >
          <dt className="shrink-0 text-content-secondary">{item.label}</dt>
          <dd className="min-w-0 text-right font-medium text-content-primary">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
