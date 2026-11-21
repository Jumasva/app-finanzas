import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/atoms/icons';
import { iconButton, iconButtonDisabled } from '@/components/ui/styles';
import { cn } from '@/lib/cn';

type PaginationProps = {
  // Página actual, desde 1
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  // «movimientos»: Mostrando 1–20 de 248 movimientos
  itemLabel?: string;
  className?: string;
};

// Números que se ven: siempre la primera, la última y dos alrededor de la actual; el resto es «…»
export function pageNumbers(page: number, pages: number): (number | 'gap')[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, index) => index + 1);

  const numbers = [1, page - 1, page, page + 1, pages];
  // Cerca de un extremo se muestran 4 seguidas, para que el «…» no tape una sola página
  if (page <= 3) numbers.push(2, 3, 4);
  if (page >= pages - 2) numbers.push(pages - 3, pages - 2, pages - 1);

  const sorted = [...new Set(numbers)].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  return sorted.flatMap((n, index) => (index > 0 && n - sorted[index - 1] > 1 ? ['gap' as const, n] : [n]));
}

// Anterior y siguiente: el botón gris de solo ícono. Los números, cuadros del mismo tamaño
const arrow = cn(iconButton, iconButtonDisabled, 'rounded-sm');
const square = 'grid size-9 shrink-0 place-items-center rounded-sm text-body tabular-nums transition-colors';

/* ══ PAGINATION · Figma › Molecules › M18 Pagination ══ */
/* Para tablas largas en desktop. En móvil queda solo anterior / siguiente; la lista larga usa «Cargar más» (un Button) */

export function Pagination({ page, pageSize, total, onPageChange, itemLabel, className }: PaginationProps) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <nav aria-label="Paginación" className={cn('flex flex-wrap items-center justify-between gap-4', className)}>
      <p className="text-body text-content-secondary tabular-nums">
        Mostrando {from}–{to} de {total}
        {itemLabel && ` ${itemLabel}`}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Página anterior"
          className={arrow}
        >
          <ChevronLeftIcon size={20} />
        </button>

        <span className="px-2 text-body text-content-secondary md:hidden">
          {page} de {pages}
        </span>

        <ul className="hidden items-center gap-1 md:flex">
          {pageNumbers(page, pages).map((n, index) =>
            n === 'gap' ? (
              <li
                key={`gap-${index}`}
                aria-hidden="true"
                className="grid size-9 place-items-center text-content-tertiary"
              >
                …
              </li>
            ) : (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => onPageChange(n)}
                  aria-label={`Página ${n}`}
                  aria-current={n === page ? 'page' : undefined}
                  className={cn(
                    square,
                    n === page
                      ? 'bg-brand-primary font-semibold text-brand-on-primary'
                      : 'text-content-primary hover:bg-background-subtle',
                  )}
                >
                  {n}
                </button>
              </li>
            ),
          )}
        </ul>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pages}
          aria-label="Página siguiente"
          className={arrow}
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>
    </nav>
  );
}
