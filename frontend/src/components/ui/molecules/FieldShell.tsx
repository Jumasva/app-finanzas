import { HelperText } from '@/components/ui/atoms/HelperText';
import { Label } from '@/components/ui/atoms/Label';
import { cn } from '@/lib/cn';

export type FieldShellProps = {
  label?: string;
  helper?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  className?: string;
};

// id del texto de ayuda para conectarlo con aria-describedby
export function helperIdFor(id: string) {
  return `${id}-helper`;
}

/* ══ FIELDSHELL · label arriba y texto de ayuda abajo, para los campos que no son un Input ══ */
/* Mismas medidas que Form field (M01): 8 px entre label y control, 6 px hasta el helper.
   htmlFor apunta al control; en un botón (Select, Date field) el label también lo nombra */

export function FieldShell({
  id,
  label,
  helper,
  error,
  required,
  optional,
  disabled,
  className,
  children,
}: FieldShellProps & { id: string; children: React.ReactNode }) {
  const message = error || helper;

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <Label htmlFor={id} required={required} optional={optional} disabled={disabled} className="mb-2">
          {label}
        </Label>
      )}

      {children}

      {message && (
        <HelperText id={helperIdFor(id)} variant={error ? 'error' : 'info'} className="mt-1.5">
          {message}
        </HelperText>
      )}
    </div>
  );
}
