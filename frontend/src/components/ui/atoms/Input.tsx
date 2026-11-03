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
import { cn } from '@/lib/cn';

type Size = 'md' | 'lg';

type InputProps = Omit<React.ComponentProps<'input'>, 'size' | 'type'> & {
    type?: React.HTMLInputTypeAttribute | 'money';
    size?: Size;
    icon?: IconComponent;
    invalid?: boolean;
};

/* ══ CLASES · Figma › Atomic Design › Input ══ */
/* Solo la caja: la etiqueta y el texto de ayuda son átomos aparte (molécula FormField) */

// Ícono que trae cada tipo por defecto; se cambia con la prop icon
const typeIcons: Partial<Record<string, IconComponent>> = {
    email: MailIcon,
    password: LockIcon,
    search: SearchIcon,
};

const sizes: Record<Size, { box: string; icon: string }> = {
    // En móvil el texto siempre es de 16 px: con menos, iOS hace zoom al enfocar
    md: { box: 'h-10 gap-2.5 rounded-sm px-3 text-body-lg md:text-body', icon: 'size-[18px]' },
    lg: { box: 'h-12 gap-2.5 rounded-md px-3.5 text-body-lg', icon: 'size-5' },
};

// Borde, fondo y anillo de la caja según el estado
function boxState(invalid: boolean, disabled: boolean) {
    if (disabled) return 'cursor-not-allowed border-border-subtle bg-background-subtle';
    if (invalid) return 'border-danger ring-3 ring-danger-light';
    return 'border-border-default hover:not-focus-within:border-neutral-500 focus-within:border-border-focus focus-within:ring-3 focus-within:ring-emerald-100';
}

// Color de los íconos: gris, verde al enfocar y apagado si está deshabilitado
function iconState(invalid: boolean, disabled: boolean) {
    if (disabled) return 'text-content-disabled';
    if (invalid) return 'text-content-tertiary';
    return 'text-content-tertiary group-focus-within:text-brand-primary';
}

/* ══ INPUT · caja de texto con ícono, contraseña visible y monto ══ */

export function Input({
    type = 'text',
    size = 'md',
    icon,
    invalid = false,
    disabled = false,
    inputMode,
    className,
    ...props
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isMoney = type === 'money';
    const isPassword = type === 'password';
    const Icon = icon ?? typeIcons[type];

    // El navegador no conoce "money": es un texto con teclado numérico
    const inputType = isMoney || (isPassword && showPassword) ? 'text' : type;
    const iconClass = cn(sizes[size].icon, iconState(invalid, disabled));
    const affixClass = disabled ? 'text-content-disabled' : 'text-content-primary';

    return (
        <div
            className={cn(
                'group flex w-full items-center border-[1.5px] bg-background-page transition-colors',
                sizes[size].box,
                boxState(invalid, disabled),
                className,
            )}
        >
            {Icon && <Icon className={iconClass} />}
            {isMoney && <span className={affixClass}>$</span>}

            <input
                {...props}
                type={inputType}
                inputMode={isMoney ? 'numeric' : inputMode}
                disabled={disabled}
                aria-invalid={invalid || undefined}
                className={cn(
                    'min-w-0 flex-1 bg-transparent text-content-primary outline-none placeholder:text-content-tertiary disabled:cursor-not-allowed disabled:text-content-disabled disabled:placeholder:text-content-disabled',
                    isMoney && 'text-right font-medium tabular-nums',
                )}
            />

            {invalid && <AlertIcon className={cn(sizes[size].icon, 'text-danger')} />}

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
        </div>
    );
}