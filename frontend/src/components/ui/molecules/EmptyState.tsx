import type { IconComponent } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type Size = 'md' | 'lg';
type Tone = 'brand' | 'neutral' | 'danger';

export type EmptyStateProps = {
  icon: IconComponent;
  // Positivo y concreto: «Aún no tienes movimientos», no «No hay datos»
  title: string;
  // Qué va ahí y qué hacer
  description?: string;
  // Un Button primary; opcional uno tertiary al lado
  action?: React.ReactNode;
  // md: lista vacía (M12). lg: pantalla completa (Error states)
  size?: Size;
  tone?: Tone;
  // Borde punteado cuando va solo en una tarjeta
  bordered?: boolean;
  titleAs?: 'h2' | 'h3';
  className?: string;
};

/* ══ CLASES · Figma › Molecules › M12 Empty state y Organisms › Error states ══ */
/* Ícono de 32 en un círculo (64 o 72), título en Nunito, texto de máximo 280 px y la acción centrada */

const sizes: Record<Size, { box: string; circle: string; title: string; text: string; action: string }> = {
  md: { box: 'px-6 py-8', circle: 'size-16', title: 'mt-4 text-h4', text: 'mt-1.5 max-w-[280px]', action: 'mt-5' },
  lg: { box: 'px-6 py-12', circle: 'size-18', title: 'mt-4 text-h3', text: 'mt-2 max-w-sm', action: 'mt-6' },
};

const tones: Record<Tone, string> = {
  brand: 'bg-background-brand-subtle text-brand-primary',
  neutral: 'bg-background-subtle text-content-secondary',
  danger: 'bg-danger-light text-danger',
};

/* ══ EMPTYSTATE · lo que se ve cuando no hay nada que mostrar: qué va ahí y cómo empezar ══ */

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  size = 'md',
  tone = 'brand',
  bordered = false,
  titleAs: Title = 'h3',
  className,
}: EmptyStateProps) {
  const styles = sizes[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center text-center',
        styles.box,
        bordered && 'rounded-xl border border-dashed border-border-subtle',
        className,
      )}
    >
      <span className={cn('grid place-items-center rounded-full', styles.circle, tones[tone])}>
        <Icon size={32} />
      </span>
      <Title className={cn('text-content-primary', styles.title)}>{title}</Title>
      {description && <p className={cn('text-body text-content-secondary', styles.text)}>{description}</p>}
      {action && <div className={cn('flex flex-wrap justify-center gap-3', styles.action)}>{action}</div>}
    </div>
  );
}
