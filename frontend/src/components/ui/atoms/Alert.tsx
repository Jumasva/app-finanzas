import { AlertIcon, InfoIcon, OkIcon, type IconComponent } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type Variant = 'error' | 'warning' | 'info' | 'success';

type AlertProps = React.ComponentProps<'div'> & {
  variant?: Variant;
};

/* ══ CLASES · aviso dentro de un formulario o una pantalla ══ */
/* Provisional: sacado de las capturas de login (failed, limited, timeout). Ajustar con la ficha de Figma */

const variants: Record<Variant, string> = {
  error: 'border-red-200 bg-red-50 text-red-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
  success: 'border-green-200 bg-green-50 text-green-800',
};

const icons: Record<Variant, IconComponent> = {
  error: AlertIcon,
  warning: AlertIcon,
  info: InfoIcon,
  success: OkIcon,
};

/* ══ ALERT · ícono + mensaje ══ */

export function Alert({ variant = 'info', className, children, ...props }: AlertProps) {
  const Icon = icons[variant];

  return (
    <div
      // error y warning se anuncian apenas aparecen; info y success, cuando el lector termine lo que lee
      role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
      className={cn('flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-body', variants[variant], className)}
      {...props}
    >
      <Icon size={20} className="mt-px" />
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}
