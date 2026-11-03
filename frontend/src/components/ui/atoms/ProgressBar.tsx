import { cn } from '@/lib/cn';

type Kind = 'budget' | 'goal';
type Tone = 'brand' | 'warning' | 'danger' | 'success';
type Size = 'md' | 'sm';

type ProgressBarProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  value: number;
  max: number;
  // budget: presupuesto (verde → ámbar → rojo). goal: meta de ahorro (verde → success al cumplirla)
  kind?: Kind;
  // Fuerza un color e ignora la regla del porcentaje
  tone?: Tone;
  size?: Size;
  // Texto de la izquierda: «$620.000 de $1.000.000», «Meta cumplida»
  label?: React.ReactNode;
};

/* ══ CLASES · Figma › Atomic Design › Progress bar ══ */
/* Avance de presupuestos y metas. El color cambia según el porcentaje, y el porcentaje se muestra en texto */

const tones: Record<Tone, { fill: string; text: string }> = {
  brand: { fill: 'bg-emerald-600', text: 'text-neutral-700' },
  warning: { fill: 'bg-amber-500', text: 'text-amber-800' },
  danger: { fill: 'bg-red-600', text: 'text-red-700' },
  success: { fill: 'bg-green-600', text: 'text-green-700' },
};

const sizes: Record<Size, string> = {
  md: 'h-2',
  sm: 'h-1',
};

// Regla de Figma: presupuesto < 75 % brand, 75–99 % warning, ≥ 100 % danger. Meta cumplida: success
function toneFor(kind: Kind, percent: number): Tone {
  if (kind === 'goal') return percent >= 100 ? 'success' : 'brand';
  if (percent >= 100) return 'danger';
  if (percent >= 75) return 'warning';
  return 'brand';
}

/* ══ PROGRESSBAR · barra de avance con su porcentaje ══ */

export function ProgressBar({
  value,
  max,
  kind = 'budget',
  tone,
  size = 'md',
  label,
  className,
  ...props
}: ProgressBarProps) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  const styles = tones[tone ?? toneFor(kind, percent)];

  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)} {...props}>
      {/* role="progressbar": el lector anuncia el porcentaje aunque la barra sea small (sin texto visible) */}
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${percent} %`}
        className={cn('w-full overflow-hidden rounded-full bg-neutral-50', sizes[size])}
      >
        {/* Pasado el 100 % la barra queda llena */}
        <div
          className={cn('h-full rounded-full transition-[width]', styles.fill)}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>

      {/* Small va sin label: es para listas compactas */}
      {size === 'md' && (
        <div className="flex items-center justify-between gap-3 text-body-sm">
          <span className="text-neutral-600">{label}</span>
          <span className={cn('font-semibold tabular-nums', styles.text)}>{percent}%</span>
        </div>
      )}
    </div>
  );
}
