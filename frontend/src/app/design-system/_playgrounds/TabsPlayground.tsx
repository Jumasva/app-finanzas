'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/molecules/Tabs';
import { Playground } from '../_components/Playground';

const items = [
  { value: 'summary', label: 'Resumen' },
  { value: 'movements', label: 'Movimientos' },
  { value: 'reminders', label: 'Recordatorios' },
];

const content: Record<string, string> = {
  summary: 'Saldo, ingresos y egresos del periodo.',
  movements: 'La lista de movimientos del periodo.',
  reminders: 'Los recordatorios de pagos próximos.',
};

// La vista guarda la pestaña activa: Tabs es controlado
function TabsDemo(props: Pick<React.ComponentProps<typeof Tabs>, 'label'>) {
  const [tab, setTab] = useState('summary');
  return (
    <Tabs {...props} items={items} value={tab} onChange={setTab} className="w-full max-w-lg">
      <p className="text-body text-content-secondary">{content[tab]}</p>
    </Tabs>
  );
}

export function TabsPlayground() {
  return (
    <Playground
      component="Tabs"
      importFrom="@/components/ui/molecules/Tabs"
      controls={[{ type: 'text', prop: 'label', default: 'Secciones' }]}
      codeProps={['items={items}', 'value={tab}', 'onChange={setTab}']}
      childrenCode="{tab === 'summary' && <Resumen />}"
      render={(props) => <TabsDemo {...(props as React.ComponentProps<typeof TabsDemo>)} />}
    />
  );
}
