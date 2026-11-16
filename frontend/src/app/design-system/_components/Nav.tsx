'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ButtonLink } from '@/components/ui/atoms/Button';
import { cn } from '@/lib/cn';
import { catalog, levels } from '../_data/catalog';

// Menú lateral del design system: acceso a tokens y lista de componentes por nivel
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

      {levels.map(({ level, title }) => (
        <div key={level} className="flex flex-col gap-1">
          <span className="px-3 text-overline text-neutral-500 uppercase">{title}</span>
          {catalog
            .filter((item) => item.level === level)
            .map((item) => {
              const href = `/design-system/${item.slug}`;
              const active = pathname === href;

              return (
                <Link
                  key={item.slug}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-sm px-3 py-1.5 text-body text-neutral-700 hover:bg-neutral-50',
                    active && 'bg-emerald-50 font-semibold text-emerald-800 hover:bg-emerald-50',
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
        </div>
      ))}
    </nav>
  );
}
