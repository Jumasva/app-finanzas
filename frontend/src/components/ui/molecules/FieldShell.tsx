import { HelperText } from '@/components/ui/atoms/HelperText';
import { Label } from '@/components/ui/atoms/Label';
import { cn } from '@/lib/cn';

export type FieldShellProps = {
  label?: string;
  helper?: string;
  error?: string;
  success?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  // Enlace a la derecha del label: «¿La olvidaste?»
  labelAction?: React.ReactNode;
  className?: string;
};

// id del texto de ayuda, para conectarlo al control con aria-describedby
export function helperIdFor(id: string) {
  return `${id}-helper`;
}

// aria-describedby del control: solo si hay un mensaje debajo
export function describedBy(
  id: string,
  { helper, error, success }: Pick<FieldShellProps, 'helper' | 'error' | 'success'>,
) {
  return error || success || helper ? helperIdFor(id) : undefined;
}

/* ══ FIELDSHELL · Figma › Molecules › M01 Form field: label arriba y mensaje abajo ══ */
/* Lo comparten Form field, Select y Date field. 8 px entre label y control, 6 px hasta el mensaje.
   htmlFor apunta al control; si es un botón (Select, Date field) el label también lo nombra */

export function FieldShell({
  id,
  label,
  helper,
  error,
  success,
  required,
  optional,
  disabled,
  labelAction,
  className,
  children,
}: FieldShellProps & { id: string; children: React.ReactNode }) {
  const message = error || success || helper;
  const variant = error ? 'error' : success ? 'success' : 'info';

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <div className="mb-2 flex items-center justify-between gap-3">
          <Label htmlFor={id} required={required} optional={optional} disabled={disabled}>
            {label}
          </Label>
          {labelAction}
        </div>
      )}

      {children}

      {/* Sin mensaje no se renderiza */}
      {message && (
        <HelperText id={helperIdFor(id)} variant={variant} className="mt-1.5">
          {message}
        </HelperText>
      )}
    </div>
  );
}
