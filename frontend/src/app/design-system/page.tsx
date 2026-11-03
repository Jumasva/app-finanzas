import Link from 'next/link';
import { ButtonLink } from '@/components/ui/atoms/Button';
import { atoms } from './_data/atoms';

// Portada: acceso a los tokens y una tarjeta por átomo
export default function DesignSystemPage() {
  return (
    <main className="flex flex-col gap-8 p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1">Design system</h1>
          <p className="text-body-lg text-neutral-600">
            Cada átomo con sus variantes, un playground para probar las props y el código para copiarlo.
          </p>
        </div>
        <ButtonLink href="/design-system/tokens" variant="secondary">
          Ver tokens
        </ButtonLink>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {atoms.map((atom) => (
          <Link
            key={atom.slug}
            href={`/design-system/${atom.slug}`}
            className="flex flex-col gap-1 rounded-xl border border-neutral-100 p-5 transition-colors hover:border-emerald-600 hover:bg-emerald-50"
          >
            <span className="text-label-lg text-navy-900">{atom.name}</span>
            <span className="text-body text-neutral-600">{atom.description}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
