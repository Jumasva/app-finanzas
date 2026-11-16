'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/molecules/Tabs';
import { Example } from '../_components/Playground';

const items = [
  { value: 'summary', label: 'Resumen' },
  { value: 'movements', label: 'Movimientos' },
  { value: 'reminders', label: 'Recordatorios' },
] as const;

const content: Record<(typeof items)[number]['value'], string> = {
  summary: 'Saldo, ingresos y egresos del periodo.',
  movements: 'La lista de movimientos del periodo.',
  reminders: 'Los recordatorios de pagos próximos.',
};

export function TabsPlayground() {
  const [tab, setTab] = useState<(typeof items)[number]['value']>('summary');

  return (
    <Example
      title="En uso (flechas, Inicio y Fin cambian de pestaña)"
      previewClassName="justify-start"
      code={`const [tab, setTab] = useState<'summary' | 'movements' | 'reminders'>('summary');

<Tabs label="Secciones" items={items} value={tab} onChange={setTab}>
  {tab === 'summary' && <Resumen />}
  {tab === 'movements' && <Movimientos />}
</Tabs>`}
    >
      <Tabs label="Secciones" items={items} value={tab} onChange={setTab} className="w-full max-w-lg">
        <p className="text-body text-content-secondary">{content[tab]}</p>
      </Tabs>
    </Example>
  );
}
