'use client';

import { LegendItem } from '@/components/ui/molecules/LegendItem';
import { Example } from '../_components/Playground';

export function LegendItemPlayground() {
  return (
    <Example
      title="Leyenda de una gráfica"
      code={`<LegendItem colorClassName="bg-teal-600" label="Vivienda" value={1450000} percent={40} />`}
    >
      <div className="flex w-full max-w-xs flex-col gap-2.5">
        <LegendItem colorClassName="bg-teal-600" label="Vivienda" value={1450000} percent={40} />
        <LegendItem colorClassName="bg-amber-500" label="Alimentación" value={720000} percent={20} />
        <LegendItem colorClassName="bg-blue-600" label="Transporte" value={540000} percent={15} />
        <LegendItem colorClassName="bg-indigo-600" label="Entretenimiento" value={360000} percent={10} />
      </div>
    </Example>
  );
}
