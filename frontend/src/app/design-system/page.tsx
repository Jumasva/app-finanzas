import Link from 'next/link';
import { ButtonLink } from '@/components/ui/atoms/Button';
import { sections } from './_data/catalog';

// Portada: acceso a los tokens y una tarjeta por componente, agrupadas en átomos, moléculas y organismos
export default function DesignSystemPage() {
  return (
    <main className="flex flex-col gap-10 p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1">Design system</h1>
          <p className="text-body-lg text-content-secondary">
            Cada componente con sus variantes, un playground para probar las props y el código para copiarlo.
          </p>
        </div>
        <ButtonLink href="/design-system/tokens" variant="secondary">
          Ver tokens
        </ButtonLink>
      </header>

      {sections.map(({ level, title, items }) => (
        <section key={level} className="flex flex-col gap-4">
          <h2 className="text-h3">{title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/design-system/${item.slug}`}
                className="flex flex-col gap-1 rounded-xl border border-border-subtle p-5 transition-colors hover:border-brand-primary hover:bg-background-brand-subtle"
              >
                <span className="text-label-lg text-content-primary">{item.name}</span>
                <span className="text-body text-content-secondary">{item.description}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
