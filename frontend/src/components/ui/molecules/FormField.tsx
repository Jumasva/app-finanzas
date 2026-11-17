'use client';

import { useId } from 'react';
import { Input } from '@/components/ui/atoms/Input';
import { describedBy, FieldShell, type FieldShellProps } from '@/components/ui/molecules/FieldShell';

type FormFieldProps = React.ComponentProps<typeof Input> &
  Omit<FieldShellProps, 'label'> & {
    label: string;
  };

/* ══ FORMFIELD · Figma › Molecules › M01 Form field: Label + Input + Helper text ══ */

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

  return (
    <FieldShell
      id={inputId}
      label={label}
      helper={helper}
      error={error}
      success={success}
      required={required}
      optional={optional}
      disabled={disabled}
      labelAction={labelAction}
      className={className}
    >
      <Input
        {...props}
        id={inputId}
        required={required}
        disabled={disabled}
        invalid={invalid || Boolean(error)}
        aria-describedby={describedBy(inputId, { helper, error, success })}
      />
    </FieldShell>
  );
}
