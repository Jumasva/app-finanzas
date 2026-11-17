'use client';

import { useState } from 'react';
import {
  AlertIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  SearchIcon,
  type IconComponent,
} from '@/components/ui/atoms/icons';
import {
  fieldBase,
  fieldIconSizes,
  fieldIconState,
  fieldSizes,
  fieldState,
  type FieldSize,
} from '@/components/ui/styles';
import { cn } from '@/lib/cn';

type InputProps = Omit<React.ComponentProps<'input'>, 'size' | 'type'> & {
  type?: React.HTMLInputTypeAttribute | 'money';
  size?: FieldSize;
  icon?: IconComponent;
  invalid?: boolean;
  // Algo más dentro de la caja, a la derecha: el botón de limpiar del Search bar
  suffix?: React.ReactNode;
};

/* ══ CLASES · Figma › Atomic Design › Input ══ */
/* Solo la caja: la etiqueta y el texto de ayuda son átomos aparte (molécula FormField).
   La caja y sus estados son los de styles.ts: los comparte con Select y Date field */

// Ícono que trae cada tipo por defecto; se cambia con la prop icon
const typeIcons: Partial<Record<string, IconComponent>> = {
  email: MailIcon,
  password: LockIcon,
  search: SearchIcon,
};

/* ══ INPUT · caja de texto con ícono, contraseña visible y monto ══ */

export function Input({
  type = 'text',
  size = 'md',
  icon,
  invalid = false,
  disabled = false,
  inputMode,
  suffix,
  className,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isMoney = type === 'money';
  const isPassword = type === 'password';
  const Icon = icon ?? typeIcons[type];

  // El navegador no conoce "money": es un texto con teclado numérico
  const inputType = isMoney || (isPassword && showPassword) ? 'text' : type;
  const iconClass = cn(fieldIconSizes[size], fieldIconState({ invalid, disabled }));
  const affixClass = disabled ? 'text-content-disabled' : 'text-content-primary';

  return (
    <div className={cn('group', fieldBase, fieldSizes[size], fieldState({ invalid, disabled }), className)}>
      {Icon && <Icon className={iconClass} />}
      {isMoney && <span className={affixClass}>$</span>}

      <input
        {...props}
        type={inputType}
        inputMode={isMoney ? 'numeric' : inputMode}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          'min-w-0 flex-1 bg-transparent text-content-primary outline-none placeholder:text-content-tertiary disabled:cursor-not-allowed disabled:text-content-disabled disabled:placeholder:text-content-disabled [&::-webkit-search-cancel-button]:hidden',
          isMoney && 'text-right font-medium tabular-nums',
        )}
      />

      {invalid && <AlertIcon className={cn(fieldIconSizes[size], 'text-danger')} />}

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((visible) => !visible)}
          disabled={disabled}
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="shrink-0 rounded-[4px] disabled:cursor-not-allowed"
        >
          {showPassword ? <EyeOffIcon className={iconClass} /> : <EyeIcon className={iconClass} />}
        </button>
      )}

      {isMoney && <span className="text-body-sm text-content-tertiary">COP</span>}

      {suffix}
    </div>
  );
}
