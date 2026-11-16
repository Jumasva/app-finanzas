'use client';

import { useState } from 'react';
import { DateField } from '@/components/ui/molecules/DateField';
import { todayIso } from '@/lib/date';
import { Example, Gallery, Row } from '../_components/Playground';

export function DateFieldPlayground() {
  const [date, setDate] = useState<string | null>(null);

  return (
    <>
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
