import { AlertIcon, InfoIcon, OkIcon, XIcon, type IconComponent } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type Variant = 'error' | 'warning' | 'info' | 'success';

type AlertProps = React.ComponentProps<'div'> & {
  variant?: Variant;
  // Título en 14 SemiBold. Sin título, el mensaje va solo (avisos de los formularios)
  title?: string;
  // Una sola acción, como enlace subrayado debajo del texto: «Registrar pago»
  action?: React.ReactNode;
  // x para cerrarlo. No va en los errores críticos
  onClose?: () => void;
};

/* ══ CLASES · Figma › Molecules › M08 Alert ══ */
/* Padding 16, gap 12, radio 12. Fondo color/50, borde color/200, ícono de 20 en color/600,
   título color/900 y texto color/800 */

const variants: Record<Variant, { box: string; icon: string; title: string }> = {
  error: { box: 'border-red-200 bg-red-50 text-red-800', icon: 'text-red-600', title: 'text-red-900' },
  warning: { box: 'border-amber-200 bg-amber-50 text-amber-800', icon: 'text-amber-600', title: 'text-amber-900' },
  info: { box: 'border-blue-200 bg-blue-50 text-blue-800', icon: 'text-blue-600', title: 'text-blue-900' },
  success: { box: 'border-green-200 bg-green-50 text-green-800', icon: 'text-green-600', title: 'text-green-900' },
};

const icons: Record<Variant, IconComponent> = {
  error: AlertIcon,
  warning: AlertIcon,
  info: InfoIcon,
  success: OkIcon,
};

/* ══ ALERT · mensaje dentro de la página que se queda hasta que el usuario lo cierre o lo resuelva ══ */

export function Alert({ variant = 'info', title, action, onClose, className, children, ...props }: AlertProps) {
  const Icon = icons[variant];
  const styles = variants[variant];

  return (
    <div
      // error y warning se anuncian apenas aparecen; info y success, cuando el lector termine lo que lee
      role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
      className={cn('flex items-start gap-3 rounded-lg border p-4 text-body', styles.box, className)}
      {...props}
    >
      <Icon size={20} className={styles.icon} />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {title && <p className={cn('text-label', styles.title)}>{title}</p>}
        {children}
        {action && <div className="mt-1.5 text-label underline underline-offset-2">{action}</div>}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar aviso"
          className="-my-1 -mr-1 grid size-7 shrink-0 place-items-center rounded-sm opacity-80 hover:bg-black/5 hover:opacity-100"
        >
          <XIcon size={16} />
        </button>
      )}
    </div>
  );
}
