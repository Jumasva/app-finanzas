import type { IconComponent } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type EmptyStateProps = {
  icon: IconComponent;
  // Positivo y concreto: «Aún no tienes movimientos», no «No hay datos»
  title: string;
  // Qué va ahí y qué hacer
  description?: string;
  // Un Button primary; opcional uno tertiary al lado
  action?: React.ReactNode;
  // Borde punteado cuando va solo en una tarjeta
  bordered?: boolean;
  className?: string;
};

/* ══ EMPTYSTATE · Figma › Molecules › M12 Empty state ══ */
/* Ícono de 32 en círculo de 64 emerald/50, título 18 Nunito, texto 14 de máximo 280 px, padding 32 × 24 */

export function EmptyState({ icon: Icon, title, description, action, bordered = false, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center px-6 py-8 text-center',
        bordered && 'rounded-xl border border-dashed border-border-subtle',
        className,
      )}
    >
      <span className="grid size-16 place-items-center rounded-full bg-background-brand-subtle text-brand-primary">
        <Icon size={32} />
      </span>
      <h3 className="mt-4 text-h4 text-content-primary">{title}</h3>
      {description && <p className="mt-1.5 max-w-[280px] text-body text-content-secondary">{description}</p>}
      {action && <div className="mt-5 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}
