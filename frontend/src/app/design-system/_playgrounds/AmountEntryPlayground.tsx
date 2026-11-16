'use client';

import { useState } from 'react';
import { AmountEntry } from '@/components/ui/molecules/AmountEntry';
import { Example, Gallery, Row } from '../_components/Playground';

export function AmountEntryPlayground() {
  const [amount, setAmount] = useState('');

  return (
    <>
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
