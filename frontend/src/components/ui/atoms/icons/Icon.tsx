import { cn } from '@/lib/cn';

export type IconSize = 16 | 20 | 24 | 32;

export type IconProps = Omit<React.ComponentProps<'svg'>, 'children'> & {
  size?: IconSize;
  // Solo para íconos sin texto al lado: es el nombre que lee el lector de pantalla
  label?: string;
};

// Tipo que reciben las props iconLeft, iconRight o icon de los átomos
export type IconComponent = (props: IconProps) => React.ReactElement;

/* ══ ICON · Figma › Atomic Design › Icon ══ */
/* Lienzo 24 × 24, trazo 2 (1.75 desde 32 px), esquinas redondeadas. El color se hereda (currentColor) */

export function createIcon(name: string, shapes: React.ReactNode): IconComponent {
  function Icon({ size = 24, label, strokeWidth, className, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth ?? (size >= 32 ? 1.75 : 2)}
        strokeLinecap="round"
        strokeLinejoin="round"
        // Decorativo por defecto; con label se anuncia como imagen
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        className={cn('shrink-0', className)}
        {...props}
      >
        {shapes}
      </svg>
    );
  }

  Icon.displayName = name;
  return Icon;
}
