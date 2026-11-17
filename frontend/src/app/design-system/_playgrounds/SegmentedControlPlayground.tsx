'use client';

import { useState } from 'react';
import { SegmentedControl } from '@/components/ui/molecules/SegmentedControl';
import { Example, Gallery, Playground, Row } from '../_components/Playground';

const kinds = [
  { value: 'expense', label: 'Gastos' },
  { value: 'income', label: 'Ingresos' },
] as const;

const periods = [
  { value: 'day', label: 'Día' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
  { value: 'year', label: 'Año' },
] as const;

const views = [
  { value: 'list', label: 'Lista' },
  { value: 'chart', label: 'Gráfico' },
] as const;

function SegmentedControlDemo(
  props: Omit<React.ComponentProps<typeof SegmentedControl>, 'options' | 'value' | 'onChange'>,
) {
  const [value, setValue] = useState<string>('expense');
  return <SegmentedControl {...props} options={kinds} value={value} onChange={setValue} className="w-60" />;
}

export function SegmentedControlPlayground() {
  const [kind, setKind] = useState<(typeof kinds)[number]['value']>('expense');
  const [period, setPeriod] = useState<(typeof periods)[number]['value']>('month');
  const [view, setView] = useState<(typeof views)[number]['value']>('chart');

  return (
    <>
      <Playground
        component="SegmentedControl"
        importFrom="@/components/ui/molecules/SegmentedControl"
        controls={[
          { type: 'text', prop: 'label', default: 'Tipo de movimiento' },
          { type: 'select', prop: 'size', options: ['md', 'sm'], default: 'md' },
        ]}
        render={(props) => <SegmentedControlDemo {...(props as React.ComponentProps<typeof SegmentedControlDemo>)} />}
        codeProps={['options={options}', 'value={kind}', 'onChange={setKind}']}
      />
      <Example
        title="En uso (Tab entra y las flechas cambian de opción)"
        code={`const [kind, setKind] = useState<'expense' | 'income'>('expense');

<SegmentedControl
  label="Tipo de movimiento"
  options={[
    { value: 'expense', label: 'Gastos' },
    { value: 'income', label: 'Ingresos' },
  ]}
  value={kind}
  onChange={setKind}
/>`}
      >
        <SegmentedControl label="Tipo de movimiento" options={kinds} value={kind} onChange={setKind} className="w-60" />
      </Example>

      <Gallery>
        <Row label="4 opciones · md">
          <SegmentedControl label="Periodo" options={periods} value={period} onChange={setPeriod} />
        </Row>
        <Row label="sm · 32 px">
          <SegmentedControl label="Vista" options={views} value={view} onChange={setView} size="sm" />
        </Row>
      </Gallery>
    </>
  );
}
