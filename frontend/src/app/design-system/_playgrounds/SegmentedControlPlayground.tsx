'use client';

import { useState } from 'react';
import { SegmentedControl } from '@/components/ui/molecules/SegmentedControl';
import { Gallery, Playground, Row } from '../_components/Playground';

const kinds = [
  { value: 'expense', label: 'Gastos' },
  { value: 'income', label: 'Ingresos' },
];

const periods = [
  { value: 'day', label: 'Día' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
  { value: 'year', label: 'Año' },
];

// La vista guarda la opción elegida: SegmentedControl es controlado
function SegmentedControlDemo({
  options = kinds,
  ...props
}: Omit<React.ComponentProps<typeof SegmentedControl>, 'value' | 'onChange' | 'options'> & {
  options?: typeof kinds;
}) {
  const [value, setValue] = useState(options[0].value);
  return <SegmentedControl {...props} options={options} value={value} onChange={setValue} />;
}

export function SegmentedControlPlayground() {
  return (
    <>
      <Playground
        component="SegmentedControl"
        importFrom="@/components/ui/molecules/SegmentedControl"
        controls={[
          { type: 'text', prop: 'label', default: 'Tipo de movimiento' },
          { type: 'select', prop: 'size', options: ['md', 'sm'], default: 'md' },
        ]}
        codeProps={['options={options}', 'value={kind}', 'onChange={setKind}']}
        render={(props) => (
          <SegmentedControlDemo {...(props as React.ComponentProps<typeof SegmentedControlDemo>)} className="w-60" />
        )}
      />

      <Gallery>
        <Row label="4 opciones">
          <SegmentedControlDemo label="Periodo" options={periods} />
        </Row>
      </Gallery>
    </>
  );
}
