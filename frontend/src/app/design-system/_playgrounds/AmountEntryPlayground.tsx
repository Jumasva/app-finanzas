'use client';

import { useState } from 'react';
import { AmountEntry } from '@/components/ui/molecules/AmountEntry';
import { Example, Gallery, Playground, Row } from '../_components/Playground';

function AmountEntryDemo(props: Omit<React.ComponentProps<typeof AmountEntry>, 'value' | 'onValueChange'>) {
  const [value, setValue] = useState('186400');
  return <AmountEntry {...props} value={value} onValueChange={setValue} className="w-full max-w-md" />;
}

export function AmountEntryPlayground() {
  const [amount, setAmount] = useState('');

  return (
    <>
      <Playground
        component="AmountEntry"
        importFrom="@/components/ui/molecules/AmountEntry"
        controls={[
          { type: 'select', prop: 'kind', options: ['expense', 'income', 'neutral'], default: 'expense' },
          { type: 'text', prop: 'label', default: 'Monto' },
          { type: 'text', prop: 'currency', default: 'COP · Peso colombiano' },
          { type: 'text', prop: 'error', default: '' },
        ]}
        render={(props) => <AmountEntryDemo {...(props as React.ComponentProps<typeof AmountEntryDemo>)} />}
        codeProps={['value={amount}', 'onValueChange={setAmount}']}
      />
      <Example
        title="En uso (escribe un monto)"
        code={`const [amount, setAmount] = useState('');

<AmountEntry kind="expense" value={amount} onValueChange={setAmount} name="amount" />`}
      >
        <AmountEntry kind="expense" value={amount} onValueChange={setAmount} className="w-full max-w-md" />
      </Example>

      <Gallery>
        <Row label="ingreso" className="w-full max-w-md">
          <AmountEntry kind="income" value="186400" onValueChange={() => {}} className="w-full" />
        </Row>
        <Row label="neutral" className="w-full max-w-md">
          <AmountEntry kind="neutral" value="186400" onValueChange={() => {}} className="w-full" />
        </Row>
        <Row label="error" className="w-full max-w-md">
          <AmountEntry value="" onValueChange={() => {}} error="Ingresa un monto mayor a $0." className="w-full" />
        </Row>
      </Gallery>
    </>
  );
}
