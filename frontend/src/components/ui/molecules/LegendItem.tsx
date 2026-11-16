import { cn } from '@/lib/cn';
import { formatMoney } from '@/lib/format';

type LegendItemProps = {
  // Mismo color que la serie en la gráfica: una clase bg-… del tema
  colorClassName: string;
  label: string;
  value: number;
  // De 0 a 100
  percent?: number;
  className?: string;
};

/* ══ LEGENDITEM · Figma › Molecules › M20 Legend item ══ */
/* Acompaña las gráficas: punto de 10 px, nombre, monto y porcentaje. El nombre siempre va escrito:
   la gráfica no depende solo del color */

export function LegendItem({ colorClassName, label, value, percent, className }: LegendItemProps) {
  return (
    <div className={cn('flex items-center gap-2.5 text-body', className)}>
      <span aria-hidden="true" className={cn('size-2.5 shrink-0 rounded-[3px]', colorClassName)} />
      <span className="min-w-0 flex-1 truncate text-content-primary">{label}</span>
      <span className="font-medium text-content-primary tabular-nums">{formatMoney(value)}</span>
      {percent !== undefined && (
        <span className="w-10 text-right text-body-sm text-content-tertiary tabular-nums">{Math.round(percent)}%</span>
      )}
    </div>
  );
}
