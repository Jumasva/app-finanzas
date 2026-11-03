import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { atoms } from '../_data/atoms';
import { playgrounds } from '../_playgrounds';

// Una página por átomo: /design-system/badge, /design-system/button…
export function generateStaticParams() {
  return atoms.map((atom) => ({ atom: atom.slug }));
}

// Lee el átomo de la URL. Va dentro de <Suspense> porque cacheComponents pide que los params no bloqueen la navegación
async function AtomContent({ params }: { params: PageProps<'/design-system/[atom]'>['params'] }) {
  const { atom } = await params;
  const info = atoms.find((item) => item.slug === atom);
  const AtomPlayground = playgrounds[atom];

  if (!info || !AtomPlayground) notFound();

  return (
    <>
      <header className="flex flex-col gap-1">
        <h1 className="text-h1">{info.name}</h1>
        <p className="text-body-lg text-neutral-600">{info.description}</p>
      </header>

      <AtomPlayground />
    </>
  );
}

export default function AtomPage({ params }: PageProps<'/design-system/[atom]'>) {
  return (
    <main className="flex flex-col gap-10 p-8">
      <Suspense fallback={<p className="text-body text-neutral-500">Cargando…</p>}>
        <AtomContent params={params} />
      </Suspense>
    </main>
  );
}
