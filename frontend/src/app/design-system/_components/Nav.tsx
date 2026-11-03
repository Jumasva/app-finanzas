'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ButtonLink } from '@/components/ui/atoms/Button';
import { cn } from '@/lib/cn';
import { atoms } from '../_data/atoms';

// Menú lateral del design system: acceso a tokens y lista de átomos
export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6">
      <Link href="/design-system" className="font-heading text-h4 text-navy-900">
        Design system
      </Link>

      <ButtonLink href="/design-system/tokens" variant="secondary" size="sm" className="self-start">
        Ver tokens
      </ButtonLink>

      <div className="flex flex-col gap-1">
        <span className="px-3 text-overline text-neutral-500 uppercase">Átomos</span>
        {atoms.map((atom) => {
          const href = `/design-system/${atom.slug}`;
          const active = pathname === href;

          return (
            <Link
              key={atom.slug}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'rounded-sm px-3 py-1.5 text-body text-neutral-700 hover:bg-neutral-50',
                active && 'bg-emerald-50 font-semibold text-emerald-800 hover:bg-emerald-50',
              )}
            >
              {atom.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
