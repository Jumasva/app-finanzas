'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/ui/organisms/DatePicker';
import { todayIso } from '@/lib/date';
import { Playground } from '../_components/Playground';

// La vista guarda la fecha: DatePicker es controlado
function DatePickerDemo(props: Omit<React.ComponentProps<typeof DatePicker>, 'value' | 'onChange'>) {
  const [value, setValue] = useState<string | null>(todayIso());
  return <DatePicker {...props} value={value} onChange={setValue} />;
}

export function DatePickerPlayground() {
  return (
    <Playground
      component="DatePicker"
      importFrom="@/components/ui/organisms/DatePicker"
      controls={[
        { type: 'text', prop: 'min', default: '' },
        { type: 'text', prop: 'max', default: todayIso() },
      ]}
      codeProps={['value={date}', 'onChange={setDate}']}
      render={(props) => <DatePickerDemo {...(props as React.ComponentProps<typeof DatePickerDemo>)} />}
    />
  );
}
