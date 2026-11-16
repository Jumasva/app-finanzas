import { BellIcon } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type NotificationButtonProps = Omit<React.ComponentProps<'button'>, 'children'> & {
  // Avisos sin leer. 0 no muestra el contador; desde 100 dice «99+»
  count?: number;
};

/* ══ NOTIFICATIONBUTTON · Figma › Molecules › M11 Notification button ══ */
/* Campana de 40 × 40, radio 10, con contador rojo de 16 px y borde blanco de 2 */

export function NotificationButton({ count = 0, className, ...props }: NotificationButtonProps) {
  const label = count > 0 ? `Notificaciones, ${count} sin leer` : 'Notificaciones';

  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'relative grid size-10 place-items-center rounded-md border border-border-subtle bg-background-page text-content-secondary transition-colors hover:bg-background-subtle hover:text-content-primary',
        className,
      )}
      {...props}
    >
      <BellIcon size={20} />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1.5 -right-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] leading-none font-semibold text-white tabular-nums ring-2 ring-background-page"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
