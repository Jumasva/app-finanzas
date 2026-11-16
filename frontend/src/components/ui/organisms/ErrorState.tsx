import type { IconComponent } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type Tone = 'danger' | 'neutral';

type ErrorStateProps = {
  icon: IconComponent;
  title: string;
  description?: string;
  // Reintentar, Ir al inicio…
  actions?: React.ReactNode;
  tone?: Tone;
  className?: string;
};

/* ══ CLASES · Figma › Organisms › Error states ══ */
/* Pantallas de error completas: ícono de 32 en círculo de 72, título 20 Nunito y acciones centradas */

const tones: Record<Tone, string> = {
  danger: 'bg-danger-light text-danger',
  neutral: 'bg-background-subtle text-content-secondary',
};

/* ══ ERRORSTATE · cuando una pantalla no se puede mostrar: sin conexión, página no encontrada, error del servidor ══ */

export function ErrorState({ icon: Icon, title, description, actions, tone = 'neutral', className }: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-12 text-center', className)}>
      <span className={cn('grid size-18 place-items-center rounded-full', tones[tone])}>
        <Icon size={32} />
      </span>
      <h2 className="mt-4 text-h3 text-content-primary">{title}</h2>
      {description && <p className="mt-2 max-w-sm text-body text-content-secondary">{description}</p>}
      {actions && <div className="mt-6 flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>
  );
}
