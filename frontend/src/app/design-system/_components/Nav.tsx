'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ButtonLink } from '@/components/ui/atoms/Button';
import { cn } from '@/lib/cn';
import { sections } from '../_data/catalog';

// Menú lateral del design system: acceso a tokens y lista de componentes por nivel
export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6">
      <Link href="/design-system" className="font-heading text-h4 text-content-primary">
        Design system
      </Link>

      <ButtonLink href="/design-system/tokens" variant="secondary" size="sm" className="self-start">
        Ver tokens
      </ButtonLink>

      {sections.map(({ level, title, items }) => (
        <div key={level} className="flex flex-col gap-1">
          <span className="px-3 text-overline text-content-tertiary uppercase">{title}</span>
          {items.map((item) => {
            const href = `/design-system/${item.slug}`;
            const active = pathname === href;

            return (
              <Link
                key={item.slug}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-sm px-3 py-1.5 text-body text-neutral-700 hover:bg-background-subtle',
                  active &&
                    'bg-background-brand-subtle font-semibold text-emerald-800 hover:bg-background-brand-subtle',
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
