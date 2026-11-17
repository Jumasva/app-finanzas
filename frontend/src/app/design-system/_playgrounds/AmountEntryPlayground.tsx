'use client';

import { useState } from 'react';
import { AmountEntry } from '@/components/ui/molecules/AmountEntry';
import { Playground } from '../_components/Playground';

// La vista guarda el monto: AmountEntry es controlado
function AmountEntryDemo(props: Omit<React.ComponentProps<typeof AmountEntry>, 'value' | 'onValueChange'>) {
  const [value, setValue] = useState('186400');
  return <AmountEntry {...props} value={value} onValueChange={setValue} className="w-full max-w-md" />;
}

export function AmountEntryPlayground() {
  return (
    <Playground
      component="AmountEntry"
      importFrom="@/components/ui/molecules/AmountEntry"
      controls={[
        { type: 'select', prop: 'type', options: ['expense', 'income', 'neutral'], default: 'expense' },
        { type: 'text', prop: 'label', default: 'Monto' },
        { type: 'text', prop: 'currency', default: 'COP · Peso colombiano' },
        { type: 'text', prop: 'error', default: '' },
      ]}
      codeProps={['value={amount}', 'onValueChange={setAmount}']}
      render={(props) => <AmountEntryDemo {...(props as React.ComponentProps<typeof AmountEntryDemo>)} />}
    />
  );
}
