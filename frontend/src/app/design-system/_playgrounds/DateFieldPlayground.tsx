'use client';

import { useState } from 'react';
import { DateField } from '@/components/ui/molecules/DateField';
import { todayIso } from '@/lib/date';
import { Example, Gallery, Playground, Row } from '../_components/Playground';

function DateFieldDemo(props: Omit<React.ComponentProps<typeof DateField>, 'value' | 'onChange'>) {
  const [value, setValue] = useState<string | null>(null);
  return <DateField {...props} value={value} onChange={setValue} max={todayIso()} className="w-80" />;
}

export function DateFieldPlayground() {
  const [date, setDate] = useState<string | null>(null);

  return (
    <>
      <Playground
        component="DateField"
        importFrom="@/components/ui/molecules/DateField"
        controls={[
          { type: 'text', prop: 'label', default: 'Fecha' },
          { type: 'text', prop: 'placeholder', default: 'dd/mm/aaaa' },
          { type: 'text', prop: 'helper', default: '' },
          { type: 'text', prop: 'error', default: '' },
          { type: 'boolean', prop: 'required' },
          { type: 'boolean', prop: 'optional' },
          { type: 'boolean', prop: 'disabled' },
        ]}
        render={(props) => <DateFieldDemo {...(props as React.ComponentProps<typeof DateFieldDemo>)} />}
        codeProps={['value={date}', 'onChange={setDate}', 'max={todayIso()}']}
        previewClassName="min-h-[30rem] items-start"
      />
      <Example
        title="En uso (no deja elegir fechas futuras)"
        previewClassName="min-h-[30rem] items-start"
        code={`const [date, setDate] = useState<string | null>(null);

<DateField label="Fecha" value={date} onChange={setDate} max={todayIso()} name="date" />`}
      >
        <DateField label="Fecha" value={date} onChange={setDate} max={todayIso()} className="w-80" />
      </Example>

      <Gallery>
        <Row label="con valor" className="w-80">
          <DateField label="Fecha" value="2026-10-23" onChange={() => {}} className="w-full" />
        </Row>
        <Row label="error" className="w-80">
          <DateField
            label="Fecha"
            value={null}
            onChange={() => {}}
            error="Elige la fecha del movimiento."
            className="w-full"
          />
        </Row>
        <Row label="disabled" className="w-80">
          <DateField label="Fecha" value="2026-10-23" onChange={() => {}} disabled className="w-full" />
        </Row>
      </Gallery>
    </>
  );
}
