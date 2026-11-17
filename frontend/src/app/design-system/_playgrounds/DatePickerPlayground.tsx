'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/ui/organisms/DatePicker';
import { formatDate, todayIso } from '@/lib/date';
import { Example, Playground } from '../_components/Playground';

function DatePickerDemo(props: Omit<React.ComponentProps<typeof DatePicker>, 'value' | 'onChange'>) {
  const [value, setValue] = useState<string | null>(todayIso());
  return <DatePicker {...props} value={value} onChange={setValue} />;
}

export function DatePickerPlayground() {
  const [date, setDate] = useState<string | null>(todayIso());

  return (
    <>
      <Playground
        component="DatePicker"
        importFrom="@/components/ui/organisms/DatePicker"
        controls={[
          { type: 'text', prop: 'min', default: '' },
          { type: 'text', prop: 'max', default: todayIso() },
        ]}
        render={(props) => <DatePickerDemo {...(props as React.ComponentProps<typeof DatePickerDemo>)} />}
        codeProps={['value={date}', 'onChange={setDate}']}
      />
      <Example
        title="Calendario (flechas por día, RePág y AvPág por mes)"
        code={`<DatePicker value={date} onChange={setDate} max={todayIso()} />`}
        previewClassName="flex-col"
      >
        <DatePicker value={date} onChange={setDate} max={todayIso()} />
        <p className="text-body text-content-secondary">
          Elegida: <strong className="text-content-primary">{date ? formatDate(date) : '—'}</strong> · hoy en Bogotá:{' '}
          {formatDate(todayIso())}
        </p>
      </Example>
    </>
  );
}
