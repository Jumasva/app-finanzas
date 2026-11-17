import { cn } from '@/lib/cn';

type SectionHeaderProps = {
  title: string;
  // Contador al lado del título: «Pagos próximos 4»
  count?: number;
  description?: string;
  // A la derecha: un TextLink «Ver todo», un Segmented control, un Button sm
  action?: React.ReactNode;
  as?: 'h2' | 'h3';
  id?: string;
  className?: string;
};

/* ══ SECTIONHEADER · Figma › Molecules › M17 Section header ══ */
/* El encabezado de cada tarjeta o bloque: título 20 Nunito, contador opcional y una acción a la derecha */

export function SectionHeader({
  title,
  count,
  description,
  action,
  as: Title = 'h2',
  id,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-2">
          <Title id={id} className="truncate text-h3 text-content-primary">
            {title}
          </Title>
          {count !== undefined && (
            <span className="rounded-sm bg-background-subtle px-2 py-0.5 text-label-sm text-content-secondary tabular-nums">
              {count}
            </span>
          )}
        </div>
        {description && <p className="text-body-sm text-content-secondary">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
