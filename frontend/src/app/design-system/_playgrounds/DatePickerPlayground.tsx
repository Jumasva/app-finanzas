'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/ui/organisms/DatePicker';
import { formatDate, todayIso } from '@/lib/date';
import { Example } from '../_components/Playground';

export function DatePickerPlayground() {
  const [date, setDate] = useState<string | null>(todayIso());

  return (
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
  );
}
