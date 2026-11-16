import { cn } from '@/lib/cn';

type PageHeaderProps = {
  title: string;
  // Resumen de lo que hay en la página: «248 movimientos en octubre · Gastos $2.180.400»
  description?: React.ReactNode;
  // Botones de la página, a la derecha: Exportar, Nuevo movimiento
  actions?: React.ReactNode;
  // La Topbar ya pinta la miga de pan y el h1 de la pantalla; por eso el título es h2 por defecto
  titleAs?: 'h1' | 'h2';
  className?: string;
};

/* ══ PAGEHEADER · Figma › Organisms › Page header ══ */
/* El encabezado de cada página interna: título, descripción y acciones. En móvil las acciones bajan */

export function PageHeader({ title, description, actions, titleAs: Title = 'h2', className }: PageHeaderProps) {
  return (
    <header className={cn('flex flex-col gap-4 md:flex-row md:items-end md:justify-between', className)}>
      <div className="flex min-w-0 flex-col gap-1">
        <Title className="text-h1 text-content-primary">{title}</Title>
        {description && <p className="text-body text-content-secondary">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
    </header>
  );
}
