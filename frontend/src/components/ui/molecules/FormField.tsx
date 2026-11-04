'use client';

import { useId } from 'react';
import { HelperText } from '@/components/ui/atoms/HelperText';
import { Input } from '@/components/ui/atoms/Input';
import { Label } from '@/components/ui/atoms/Label';
import { cn } from '@/lib/cn';

type FormFieldProps = React.ComponentProps<typeof Input> & {
  label: string;
  helper?: string;
  error?: string;
  success?: string;
  optional?: boolean;
  // Enlace a la derecha del label: «¿La olvidaste?»
  labelAction?: React.ReactNode;
};

export function FormField({
  label,
  helper,
  error,
  success,
  optional = false,
  labelAction,
  required = false,
  disabled = false,
  invalid = false,
  id,
  className,
  ...props
}: FormFieldProps) {
  // Un id para conectar label → input → helper. Si te pasan uno, se usa ese
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;

  const message = error || success || helper;
  const variant = error ? 'error' : success ? 'success' : 'info';

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={inputId} required={required} optional={optional} disabled={disabled}>
          {label}
        </Label>
        {labelAction}
      </div>

      {/* 8 px entre label e input */}
      <Input
        {...props}
        id={inputId}
        required={required}
        disabled={disabled}
        invalid={invalid || Boolean(error)}
        aria-describedby={message ? helperId : undefined}
        className="mt-2"
      />

      {/* 6 px entre input y helper. Sin mensaje no se renderiza */}
      {message && (
        <HelperText id={helperId} variant={variant} className="mt-1.5">
          {message}
        </HelperText>
      )}
    </div>
  );
}
