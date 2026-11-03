import { UserIcon } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type Size = 24 | 32 | 40 | 48;

type AvatarProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  // Nombre completo: es lo que lee el lector de pantalla
  name: string;
  size?: Size;
  src?: string;
  initials?: string;
  status?: boolean;
};

/* ══ CLASES · Figma › Atomic Design › Avatar ══ */
/* Foto o iniciales del usuario. Siempre circular. 24 comentarios · 32 topbar · 40 listas · 48 perfil */

const sizes: Record<Size, { box: string; initials: string; icon: string; status: string }> = {
  24: { box: 'size-6', initials: 'text-[10px]', icon: 'size-3.5', status: 'size-1.5' },
  32: { box: 'size-8', initials: 'text-[12px]', icon: 'size-4', status: 'size-2' },
  40: { box: 'size-10', initials: 'text-[14px]', icon: 'size-5', status: 'size-2.5' },
  48: { box: 'size-12', initials: 'text-[16px]', icon: 'size-6', status: 'size-3' },
};

/* ══ AVATAR · foto, iniciales o placeholder, con estado opcional ══ */

export function Avatar({ name, size = 40, src, initials, status = false, className, ...props }: AvatarProps) {
  const s = sizes[size];

  return (
    <span role="img" aria-label={name} className={cn('relative inline-flex shrink-0', s.box, className)} {...props}>
      {src ? (
        // Imagen: recorte circular y object-fit cover
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="size-full rounded-full object-cover" />
      ) : initials ? (
        // Iniciales: 2 letras, SemiBold, fondo emerald/100 y texto emerald/800
        <span
          aria-hidden="true"
          className={cn(
            'grid size-full place-items-center rounded-full bg-emerald-100 leading-none font-semibold text-emerald-800 uppercase',
            s.initials,
          )}
        >
          {initials}
        </span>
      ) : (
        // Placeholder: fondo neutral/50 e ícono user
        <span className="grid size-full place-items-center rounded-full bg-neutral-50 text-neutral-500">
          <UserIcon className={s.icon} />
        </span>
      )}

      {/* Indicador de estado: 25 % del tamaño, borde blanco de 2 px (ring: va por fuera y no achica el punto) */}
      {status && (
        <span
          aria-hidden="true"
          className={cn('absolute right-0 bottom-0 rounded-full bg-green-600 ring-2 ring-white', s.status)}
        />
      )}
    </span>
  );
}
