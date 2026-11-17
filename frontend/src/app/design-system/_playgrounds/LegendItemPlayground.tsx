'use client';

import { LegendItem } from '@/components/ui/molecules/LegendItem';
import { Gallery, Playground } from '../_components/Playground';

export function LegendItemPlayground() {
  return (
    <>
      <Playground
        component="LegendItem"
        importFrom="@/components/ui/molecules/LegendItem"
        controls={[
          {
            type: 'select',
            prop: 'colorClassName',
            options: ['bg-teal-600', 'bg-amber-500', 'bg-blue-600', 'bg-indigo-600', 'bg-red-600'],
            default: 'bg-teal-600',
          },
          { type: 'text', prop: 'label', default: 'Vivienda' },
          { type: 'number', prop: 'value', default: 1450000 },
          { type: 'number', prop: 'percent', default: 40 },
        ]}
        render={(props) => (
          <LegendItem {...(props as React.ComponentProps<typeof LegendItem>)} className="w-full max-w-xs" />
        )}
      />

      <Gallery title="Leyenda de una gráfica">
        <div className="flex w-full max-w-xs flex-col gap-2.5 py-5">
          <LegendItem colorClassName="bg-teal-600" label="Vivienda" value={1450000} percent={40} />
          <LegendItem colorClassName="bg-amber-500" label="Alimentación" value={720000} percent={20} />
          <LegendItem colorClassName="bg-blue-600" label="Transporte" value={540000} percent={15} />
          <LegendItem colorClassName="bg-indigo-600" label="Entretenimiento" value={360000} percent={10} />
        </div>
      </Gallery>
    </>
  );
}
