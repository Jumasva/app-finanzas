import { statusIcons, type Status } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type Variant = 'info' | 'error' | 'success';

type HelperTextProps = React.ComponentProps<'p'> & {
  variant?: Variant;
};

/* ══ CLASES · Figma › Atomic Design › Input › Helper text ══ */

const variants: Record<Variant, { color: string; status: Status }> = {
  info: { color: 'text-content-secondary', status: 'info' },
  error: { color: 'text-danger', status: 'danger' },
  success: { color: 'text-success', status: 'success' },
};

/* ══ HELPERTEXT · ayuda, error o éxito debajo del campo (6 px). Se conecta con aria-describedby ══ */

export function HelperText({ variant = 'info', className, children, ...props }: HelperTextProps) {
  const { color, status } = variants[variant];
  const Icon = statusIcons[status];

  return (
    <p
      aria-live={variant === 'error' ? 'polite' : undefined}
      className={cn('flex items-start gap-1.5 text-body-sm', color, className)}
      {...props}
    >
      <Icon className="mt-px size-3.5" />
      {children}
    </p>
  );
}
