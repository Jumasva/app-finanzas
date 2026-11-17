import { useId } from 'react';
import { cn } from '@/lib/cn';

type SettingsGroupProps = {
  title: string;
  description?: string;
  // Setting rows: se separan con una línea
  children: React.ReactNode;
  className?: string;
};

/* ══ SETTINGSGROUP · Figma › Organisms › Settings ══ */
/* La página de ajustes agrupada por secciones: título encima y una tarjeta con las filas (M17) */

export function SettingsGroup({ title, description, children, className }: SettingsGroupProps) {
  const id = useId();

  return (
    <section aria-labelledby={id} className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-col gap-0.5">
        <h2 id={id} className="text-h4 text-content-primary">
          {title}
        </h2>
        {description && <p className="text-body text-content-secondary">{description}</p>}
      </div>
      <div className="flex flex-col divide-y divide-border-subtle overflow-hidden rounded-xl border border-border-subtle bg-background-page">
        {children}
      </div>
    </section>
  );
}
