import { EmptyState, type EmptyStateProps } from '@/components/ui/molecules/EmptyState';

type ErrorStateProps = Pick<EmptyStateProps, 'icon' | 'title' | 'description' | 'className'> & {
  // Reintentar, Ir al inicio…
  actions?: React.ReactNode;
  tone?: 'neutral' | 'danger';
};

/* ══ ERRORSTATE · Figma › Organisms › Error states ══ */
/* Cuando una pantalla no se puede mostrar: sin conexión, página no encontrada, error del servidor.
   Es el Empty state en grande (círculo de 72, título 20) con el título como h2 de la pantalla */

export function ErrorState({ actions, tone = 'neutral', ...props }: ErrorStateProps) {
  return <EmptyState {...props} action={actions} size="lg" tone={tone} titleAs="h2" />;
}
