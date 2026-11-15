import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

export type Crumb = { label: string; href: string };

type BreadcrumbsProps = {
  // De la raíz a la página actual: el último es la página en la que se está
  items: Crumb[];
  // La página actual como h1 cuando la miga de pan es el título de la pantalla (la Topbar)
  currentAs?: 'h1' | 'span';
  className?: string;
};

/* ══ BREADCRUMBS · miga de pan: dónde está el usuario y cómo volver ══ */
/* Solo pinta lo que recibe: no lee la ruta ni sabe los nombres de las páginas.
   Los anteriores son enlaces (se ocultan en móvil para que quepa el título); el último no */

export function Breadcrumbs({ items, currentAs: Current = 'span', className }: BreadcrumbsProps) {
  const current = items.at(-1);
  const parents = items.slice(0, -1);

  return (
    <nav aria-label="Ruta de navegación" className={cn('min-w-0', className)}>
      <ol className="flex min-w-0 items-center gap-2">
        {parents.map((crumb) => (
          <Fragment key={crumb.href}>
            <li className="hidden shrink-0 sm:block">
              <Link
                href={crumb.href}
                className="rounded-sm text-h3 text-content-secondary transition-colors hover:text-content-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
              >
                {crumb.label}
              </Link>
            </li>
            <li aria-hidden="true" className="hidden shrink-0 text-content-tertiary sm:block">
              <ChevronRightIcon size={20} />
            </li>
          </Fragment>
        ))}

        {current && (
          <li className="min-w-0">
            <Current aria-current="page" className="block truncate text-h3 text-content-primary">
              {current.label}
            </Current>
          </li>
        )}
      </ol>
    </nav>
  );
}
