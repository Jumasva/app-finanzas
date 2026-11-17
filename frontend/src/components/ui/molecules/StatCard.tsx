import { Badge } from '@/components/ui/atoms/Badge';
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
/* Una cifra clave del mes con su variación (un Badge con flecha). 1/4 del contenedor en desktop, 100 % en móvil */

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
          <Badge tone={delta.tone === 'good' ? 'success' : 'danger'} className="gap-1 text-label-sm tabular-nums">
            <ArrowIcon className="size-3.5" />
            {Math.abs(delta.percent)}%
            <span className="sr-only">{delta.tone === 'good' ? ', favorable' : ', desfavorable'}</span>
          </Badge>
          {delta.caption && <span className="text-body-sm text-content-tertiary">{delta.caption}</span>}
        </div>
      )}
    </div>
  );
}
