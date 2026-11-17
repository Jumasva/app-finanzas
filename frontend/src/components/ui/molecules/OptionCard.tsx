import { cn } from '@/lib/cn';

type OptionCardProps = Omit<React.ComponentProps<'input'>, 'type' | 'title'> & {
  title: string;
  description?: string;
  // Un CategoryIcon cuadrado de 40
  icon?: React.ReactNode;
};

/* ══ OPTIONCARD · Figma › Molecules › M16 Option card ══ */
/* Elegir entre opciones con descripción. Es un radio de verdad (mismo name en el grupo): las flechas
   cambian de opción. Seleccionada: borde brand y fondo emerald/50 */

export function OptionCard({ title, description, icon, className, disabled, ...props }: OptionCardProps) {
  return (
    <label
      className={cn(
        'group relative flex cursor-pointer items-start gap-3 rounded-lg border-[1.5px] border-border-subtle bg-background-page p-4 transition-colors',
        'hover:border-border-default has-checked:border-brand-primary has-checked:bg-background-brand-subtle',
        'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-border-focus',
        disabled && 'cursor-not-allowed opacity-60 hover:border-border-subtle',
        className,
      )}
    >
      <input type="radio" disabled={disabled} className="peer sr-only" {...props} />
      {icon}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-label text-content-primary">{title}</span>
        {description && <span className="text-body-sm text-content-secondary">{description}</span>}
      </span>

      {/* El círculo del radio: se llena al marcar */}
      <span
        aria-hidden="true"
        className="grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] border-border-default bg-background-page peer-checked:border-brand-primary peer-checked:[&>span]:scale-100"
      >
        <span className="size-2.5 scale-0 rounded-full bg-brand-primary transition-transform" />
      </span>
    </label>
  );
}
