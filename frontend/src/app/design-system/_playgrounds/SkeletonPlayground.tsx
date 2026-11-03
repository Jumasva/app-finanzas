'use client';

import { useState } from 'react';
import { Skeleton } from '@/components/ui/atoms/Skeleton';
import { cn } from '@/lib/cn';
import { CodeBlock, Playground } from '../_components/Playground';

/* ══ GRUPOS LISTOS ══ */
/* Formas que imitan contenido real de la app. Cada grupo trae la vista y el mismo JSX en texto para copiarlo */

type Group = {
  name: string;
  description: string;
  preview: React.ReactNode;
  code: string;
};

const movementItem = (
  <div className="flex items-center gap-3">
    <Skeleton shape="circle" />
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton className="w-36" />
      <Skeleton className="w-24" />
    </div>
    <Skeleton className="w-16" />
  </div>
);

const movementItemCode = `<div className="flex items-center gap-3">
  <Skeleton shape="circle" />
  <div className="flex flex-1 flex-col gap-2">
    <Skeleton className="w-36" />
    <Skeleton className="w-24" />
  </div>
  <Skeleton className="w-16" />
</div>`;

const groups: Group[] = [
  {
    name: 'Párrafo',
    description: 'Bloque de texto: la última línea más corta, como un párrafo real.',
    preview: (
      <div aria-busy="true" className="flex w-full max-w-md flex-col gap-2">
        <Skeleton />
        <Skeleton />
        <Skeleton className="w-2/3" />
      </div>
    ),
    code: `<div aria-busy="true" className="flex flex-col gap-2">
  <Skeleton />
  <Skeleton />
  <Skeleton className="w-2/3" />
</div>`,
  },
  {
    name: 'Usuario',
    description: 'Avatar con nombre y correo: topbar, perfil, comentarios.',
    preview: (
      <div aria-busy="true" className="flex items-center gap-3">
        <Skeleton shape="circle" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32" />
          <Skeleton className="w-44" />
        </div>
      </div>
    ),
    code: `<div aria-busy="true" className="flex items-center gap-3">
  <Skeleton shape="circle" />
  <div className="flex flex-col gap-2">
    <Skeleton className="w-32" />
    <Skeleton className="w-44" />
  </div>
</div>`,
  },
  {
    name: 'Movimiento',
    description: 'Un ítem de la lista: ícono de categoría, nombre, fecha y monto.',
    preview: (
      <div aria-busy="true" className="w-full max-w-md">
        {movementItem}
      </div>
    ),
    code: `<div aria-busy="true">\n${movementItemCode.replace(/^/gm, '  ')}\n</div>`,
  },
  {
    name: 'Lista de movimientos',
    description: 'Tres ítems seguidos, mientras carga la lista.',
    preview: (
      <div aria-busy="true" className="flex w-full max-w-md flex-col gap-4">
        {movementItem}
        {movementItem}
        {movementItem}
      </div>
    ),
    code: `<div aria-busy="true" className="flex flex-col gap-4">
  {[1, 2, 3].map((item) => (
${movementItemCode.replace('<div className', '<div key={item} className').replace(/^/gm, '    ')}
  ))}
</div>`,
  },
  {
    name: 'Tarjeta de resumen',
    description: 'Título, monto grande y dos líneas de detalle.',
    preview: (
      <div
        aria-busy="true"
        className="flex w-full max-w-md flex-col gap-3 rounded-xl border border-neutral-100 bg-white p-5"
      >
        <Skeleton className="w-28" />
        <Skeleton shape="block" className="h-8 w-44" />
        <Skeleton className="w-56" />
        <Skeleton className="w-36" />
      </div>
    ),
    code: `<div aria-busy="true" className="flex flex-col gap-3 rounded-xl border border-neutral-100 p-5">
  <Skeleton className="w-28" />
  <Skeleton shape="block" className="h-8 w-44" />
  <Skeleton className="w-56" />
  <Skeleton className="w-36" />
</div>`,
  },
  {
    name: 'Presupuesto',
    description: 'Nombre de la categoría, barra de avance y texto del monto.',
    preview: (
      <div
        aria-busy="true"
        className="flex w-full max-w-md flex-col gap-3 rounded-xl border border-neutral-100 bg-white p-5"
      >
        <div className="flex items-center gap-3">
          <Skeleton shape="circle" className="size-8" />
          <Skeleton className="w-32" />
        </div>
        <Skeleton shape="block" className="h-2 rounded-full" />
        <Skeleton className="w-40" />
      </div>
    ),
    code: `<div aria-busy="true" className="flex flex-col gap-3 rounded-xl border border-neutral-100 p-5">
  <div className="flex items-center gap-3">
    <Skeleton shape="circle" className="size-8" />
    <Skeleton className="w-32" />
  </div>
  <Skeleton shape="block" className="h-2 rounded-full" />
  <Skeleton className="w-40" />
</div>`,
  },
  {
    name: 'Formulario',
    description: 'Dos campos con su etiqueta y el botón.',
    preview: (
      <div aria-busy="true" className="flex w-full max-w-sm flex-col gap-5">
        {[1, 2].map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <Skeleton className="w-24" />
            <Skeleton shape="block" className="h-10" />
          </div>
        ))}
        <Skeleton shape="block" className="h-12" />
      </div>
    ),
    code: `<div aria-busy="true" className="flex flex-col gap-5">
  {[1, 2].map((field) => (
    <div key={field} className="flex flex-col gap-2">
      <Skeleton className="w-24" />
      <Skeleton shape="block" className="h-10" />
    </div>
  ))}
  <Skeleton shape="block" className="h-12" />
</div>`,
  },
];

const importLine = "import { Skeleton } from '@/components/ui/atoms/Skeleton';";

/* ══ PLAYGROUND ══ */

export function SkeletonPlayground() {
  const [selected, setSelected] = useState(groups[0]);

  return (
    <>
      {/* Pieza suelta: forma y tamaño */}
      <Playground
        component="Skeleton"
        importFrom="@/components/ui/atoms/Skeleton"
        controls={[
          { type: 'select', prop: 'shape', options: ['line', 'circle', 'block'], default: 'line' },
          { type: 'text', prop: 'className', default: 'w-40' },
        ]}
        render={(props) => <Skeleton {...(props as React.ComponentProps<typeof Skeleton>)} />}
      />

      {/* Grupos listos: se elige uno y se copia su JSX */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-h3">Grupos listos</h2>
          <p className="text-body text-neutral-600">
            La zona que carga lleva <code className="font-mono">aria-busy=&quot;true&quot;</code>; las piezas son
            decorativas.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {groups.map((group) => (
            <button
              key={group.name}
              type="button"
              aria-pressed={selected.name === group.name}
              onClick={() => setSelected(group)}
              className={cn(
                'rounded-sm border px-2.5 py-1 text-label-sm transition-colors',
                selected.name === group.name
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-neutral-100 bg-white text-navy-900 hover:border-neutral-400',
              )}
            >
              {group.name}
            </button>
          ))}
        </div>

        <div className="flex min-h-56 flex-col items-center justify-center gap-6 rounded-xl border border-neutral-100 bg-white p-8">
          {selected.preview}
          <span className="text-body-sm text-neutral-500">{selected.description}</span>
        </div>

        <CodeBlock code={`${importLine}\n\n${selected.code}`} />
      </section>
    </>
  );
}
