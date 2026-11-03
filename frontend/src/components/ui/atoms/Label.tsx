import { cn } from '@/lib/cn';

type LabelProps = React.ComponentProps<'label'> & {
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
};

export function Label({
  required = false,
  optional = false,
  disabled = false,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label className={cn('text-label text-content-primary', disabled && 'text-content-disabled', className)} {...props}>
      {children}

      {/* El lector de pantalla no lee el asterisco: el input con `required` ya anuncia «obligatorio» */}
      {required && (
        <span className={cn('ml-1 text-danger', disabled && 'text-content-disabled')} aria-hidden="true">
          *
        </span>
      )}

      {/* Si es obligatorio no puede ser opcional: gana required */}
      {optional && !required && (
        <span className={cn('ml-1 font-normal text-content-tertiary', disabled && 'text-content-disabled')}>
          (opcional)
        </span>
      )}
    </label>
  );
}
