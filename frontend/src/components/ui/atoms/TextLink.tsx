import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'standalone' | 'inline';

type TextLinkProps = React.ComponentProps<typeof Link> & {
  variant?: Variant;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
};

/* ══ CLASES · Figma › Atomic Design › Link ══ */
/* Para navegar. Si la acción cambia datos, se usa un Button tertiary */

const base =
  'rounded-[4px] text-content-link underline-offset-3 hover:text-emerald-800 active:text-emerald-800 focus-visible:outline-offset-1';

const variants: Record<Variant, string> = {
  // Suelto (fuera de un párrafo): sin subrayado hasta el hover; con ícono es el «Ver todo →» de Figma
  standalone: 'inline-flex items-center gap-1 text-label hover:underline',
  // Dentro de un párrafo: siempre subrayado y toma el tamaño del texto que lo rodea
  inline: 'font-semibold underline',
};

/* ══ TEXTLINK · enlace de texto que lleva a otra página ══ */

export function TextLink({
  variant = 'standalone',
  iconLeft: IconLeft,
  iconRight: IconRight,
  className,
  children,
  ...props
}: TextLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {IconLeft && <IconLeft className="size-4 shrink-0" aria-hidden="true" />}
      {children}
      {IconRight && <IconRight className="size-4 shrink-0" aria-hidden="true" />}
    </Link>
  );
}