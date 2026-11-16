import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { catalog, levels } from '../_data/catalog';
import { playgrounds } from '../_playgrounds';

// Una página por componente: /design-system/badge, /design-system/select…
export function generateStaticParams() {
  return catalog.map((item) => ({ slug: item.slug }));
}

// Lee el componente de la URL. Va dentro de <Suspense> porque cacheComponents pide que los params no bloqueen la navegación
async function ComponentContent({ params }: { params: PageProps<'/design-system/[slug]'>['params'] }) {
  const { slug } = await params;
  const info = catalog.find((item) => item.slug === slug);
  const ComponentPlayground = playgrounds[slug];

  if (!info || !ComponentPlayground) notFound();

  const level = levels.find((item) => item.level === info.level)?.title;

  return (
    <>
      <header className="flex flex-col gap-1">
        <span className="text-overline text-neutral-500 uppercase">{level}</span>
        <h1 className="text-h1">{info.name}</h1>
        <p className="text-body-lg text-neutral-600">{info.description}</p>
        <code className="mt-1 self-start rounded-sm bg-neutral-50 px-2 py-1 font-mono text-body-sm text-neutral-700">
          {info.importFrom}
        </code>
      </header>

      <ComponentPlayground />
    </>
  );
}

export default function ComponentPage({ params }: PageProps<'/design-system/[slug]'>) {
  return (
    <main className="flex flex-col gap-10 p-8">
      <Suspense fallback={<p className="text-body text-neutral-500">Cargando…</p>}>
        <ComponentContent params={params} />
      </Suspense>
    </main>
  );
}
