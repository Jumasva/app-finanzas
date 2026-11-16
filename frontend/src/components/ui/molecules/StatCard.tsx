import { ArrowDownRightIcon, ArrowUpRightIcon } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';
import { formatMoney } from '@/lib/format';

type StatCardProps = {
  // Overline: INGRESOS, GASTOS
  label: string;
  value: number;
  // Un CategoryIcon cuadrado de 32 arriba a la derecha
  icon?: React.ReactNode;
  // Variación frente al periodo anterior
  delta?: {
    percent: number;
    // good: verde, bad: rojo. Depende del significado, no de si sube o baja (más gastos es malo)
    tone: 'good' | 'bad';
    // «vs. septiembre»
    caption?: string;
  };
  className?: string;
};

/* ══ STATCARD · Figma › Molecules › M07 Stat card ══ */
/* Una cifra clave del mes con su variación. 1/4 del contenedor en desktop, 100 % en móvil */

export function StatCard({ label, value, icon, delta, className }: StatCardProps) {
  const ArrowIcon = delta && delta.percent < 0 ? ArrowDownRightIcon : ArrowUpRightIcon;

  return (
    <div className={cn('flex flex-col gap-3 rounded-xl border border-border-subtle bg-background-page p-5', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-overline text-content-tertiary uppercase">{label}</span>
        {icon}
      </div>

      <span className="font-heading text-h1 font-extrabold text-content-primary tabular-nums">
        {formatMoney(value)}
      </span>

      {delta && (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-label-sm tabular-nums',
              delta.tone === 'good' ? 'bg-success-light text-success-dark' : 'bg-danger-light text-danger-dark',
            )}
          >
            <ArrowIcon className="size-3.5" />
            {Math.abs(delta.percent)}%
            <span className="sr-only">{delta.tone === 'good' ? '(favorable)' : '(desfavorable)'}</span>
          </span>
          {delta.caption && <span className="text-body-sm text-content-tertiary">{delta.caption}</span>}
        </div>
      )}
    </div>
  );
}
