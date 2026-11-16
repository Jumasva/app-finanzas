import Link from 'next/link';
import { ChevronRightIcon, type IconComponent } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type SettingRowProps = {
  icon: IconComponent;
  title: string;
  description?: string;
  // Con valor y navegación: «COP · Peso» y la flecha. Toda la fila es el enlace (o el botón)
  value?: string;
  href?: string;
  onClick?: () => void;
  // Un control a la derecha: Switch, Button «Cambiar». Con control, la fila no es clicable
  control?: React.ReactNode;
  // Destructivo: Cerrar sesión, Desactivar cuenta
  danger?: boolean;
  className?: string;
};

/* ══ CLASES · Figma › Molecules › M17 Setting row ══ */
/* Padding 16, ícono de 20 en cuadro de 36, título 14 SemiBold y descripción 12 */

/* ══ SETTINGROW · cada opción de la página de ajustes ══ */

export function SettingRow({
  icon: Icon,
  title,
  description,
  value,
  href,
  onClick,
  control,
  danger = false,
  className,
}: SettingRowProps) {
  const interactive = !control && (href || onClick);

  const content = (
    <>
      <span
        className={cn(
          'grid size-9 shrink-0 place-items-center rounded-md',
          danger ? 'bg-danger-light text-danger' : 'bg-background-subtle text-content-secondary',
        )}
      >
        <Icon size={20} />
      </span>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className={cn('text-label', danger ? 'text-danger-dark' : 'text-content-primary')}>{title}</span>
        {description && <span className="text-body-sm text-content-secondary">{description}</span>}
      </span>

      {value && <span className="shrink-0 text-body text-content-secondary">{value}</span>}
      {interactive && !danger && <ChevronRightIcon size={20} className="shrink-0 text-content-tertiary" />}
      {control && <span className="shrink-0">{control}</span>}
    </>
  );

  const rowClass = cn(
    'flex min-h-17 w-full items-center gap-3.5 px-4 py-3 text-left',
    interactive && 'transition-colors hover:bg-background-subtle',
    interactive && danger && 'hover:bg-danger-light',
    className,
  );

  if (interactive && href) {
    return (
      <Link href={href} className={rowClass}>
        {content}
      </Link>
    );
  }

  if (interactive) {
    return (
      <button type="button" onClick={onClick} className={rowClass}>
        {content}
      </button>
    );
  }

  return <div className={rowClass}>{content}</div>;
}
