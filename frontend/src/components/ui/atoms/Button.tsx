import Link from 'next/link';
import { LoaderIcon, type IconComponent, type IconSize } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

type ButtonStyleProps = {
  variant?: Variant;
  size?: Size;
  iconLeft?: IconComponent;
  iconRight?: IconComponent;
  loading?: boolean;
};

/* ══ CLASES · Figma › Atomic Design › Button ══ */

const base =
  'inline-flex min-w-16 shrink-0 items-center justify-center gap-2 whitespace-nowrap transition-colors select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-primary text-brand-on-primary hover:bg-emerald-700 active:bg-emerald-800',
  secondary:
    'border-[1.5px] border-brand-primary bg-background-page text-content-link hover:bg-background-brand-subtle active:bg-emerald-100',
  tertiary: 'text-content-link hover:bg-background-brand-subtle active:bg-emerald-100',
  destructive: 'bg-danger text-content-inverse hover:bg-red-700 active:bg-red-800 focus-visible:outline-danger',
};

// Se aplican en vez de los hover/active cuando el botón está deshabilitado (no cuando está cargando)
const disabledVariants: Record<Variant, string> = {
  primary: 'bg-background-subtle text-content-disabled',
  secondary: 'border-border-subtle text-content-disabled',
  tertiary: 'text-content-disabled',
  destructive: 'bg-background-subtle text-content-disabled',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 rounded-sm px-3 text-label',
  md: 'h-10 rounded-md px-4 text-label',
  lg: 'h-12 rounded-md px-5 text-label-lg',
};

// Solo ícono: cuadrado del alto del botón
const iconOnlySizes: Record<Size, string> = {
  sm: 'w-8 min-w-0 px-0',
  md: 'w-10 min-w-0 px-0',
  lg: 'w-12 min-w-0 px-0',
};

const iconSizes: Record<Size, IconSize> = { sm: 16, md: 20, lg: 20 };

/* ══ PIEZAS COMPARTIDAS ══ */

function buttonClasses({
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  disabled = false,
  className,
}: {
  variant?: Variant;
  size?: Size;
  iconOnly?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return cn(
    base,
    sizes[size],
    iconOnly && iconOnlySizes[size],
    disabled ? cn(disabledVariants[variant], 'cursor-not-allowed') : variants[variant],
    className,
  );
}

function ButtonContent({
  size = 'md',
  iconLeft: IconLeft,
  iconRight: IconRight,
  loading,
  children,
}: ButtonStyleProps & { children?: React.ReactNode }) {
  const iconSize = iconSizes[size];

  return (
    <>
      {loading ? <LoaderIcon size={iconSize} className="animate-spin" /> : IconLeft && <IconLeft size={iconSize} />}
      {children}
      {IconRight && <IconRight size={iconSize} />}
    </>
  );
}

/* ══ BUTTON · hace una acción en la página ══ */

type ButtonProps = ButtonStyleProps & React.ComponentProps<'button'>;

export function Button({
  variant,
  size,
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  const iconOnly = !children;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, iconOnly, disabled, className })}
      {...props}
    >
      <ButtonContent size={size} iconLeft={iconLeft} iconRight={iconRight} loading={loading}>
        {children}
      </ButtonContent>
    </button>
  );
}

/* ══ BUTTONLINK · se ve como botón pero lleva a otra página ══ */

type ButtonLinkProps = Omit<ButtonStyleProps, 'loading'> & React.ComponentProps<typeof Link>;

export function ButtonLink({ variant, size, iconLeft, iconRight, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, iconOnly: !children, className })} {...props}>
      <ButtonContent size={size} iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </ButtonContent>
    </Link>
  );
}
