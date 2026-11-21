'use client';

import { useState } from 'react';
import { DateField } from '@/components/ui/molecules/DateField';
import { todayIso } from '@/lib/date';
import { Playground } from '../_components/Playground';

// La vista guarda la fecha: DateField es controlado. No deja elegir fechas futuras
function DateFieldDemo(props: Omit<React.ComponentProps<typeof DateField>, 'value' | 'onChange'>) {
  const [value, setValue] = useState<string | null>(null);
  return <DateField {...props} value={value} onChange={setValue} max={todayIso()} className="w-80" />;
}

export function DateFieldPlayground() {
  return (
    <Playground
      component="DateField"
      importFrom="@/components/ui/molecules/DateField"
      previewClassName="min-h-[30rem] items-start"
      controls={[
        { type: 'text', prop: 'label', default: 'Fecha' },
        { type: 'text', prop: 'placeholder', default: 'dd/mm/aaaa' },
        { type: 'text', prop: 'helper', default: '' },
        { type: 'text', prop: 'error', default: '' },
        { type: 'boolean', prop: 'required' },
        { type: 'boolean', prop: 'optional' },
        { type: 'boolean', prop: 'disabled' },
      ]}
      codeProps={['value={date}', 'onChange={setDate}', 'max={todayIso()}']}
      render={(props) => <DateFieldDemo {...(props as React.ComponentProps<typeof DateFieldDemo>)} />}
    />
  );
}
