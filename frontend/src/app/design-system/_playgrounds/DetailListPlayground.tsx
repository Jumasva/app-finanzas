'use client';

import { Badge } from '@/components/ui/atoms/Badge';
import { DetailList } from '@/components/ui/molecules/DetailList';
import { Example } from '../_components/Playground';

export function DetailListPlayground() {
  return (
    <Example
      title="Detalle de un movimiento"
      code={`<DetailList
  items={[
    { label: 'Fecha', value: '23 oct 2026' },
    { label: 'Categoría', value: 'Alimentación' },
  ]}
/>`}
    >
      <DetailList
        className="w-full max-w-sm"
        items={[
          { label: 'Fecha', value: '23 oct 2026' },
          { label: 'Categoría', value: 'Alimentación' },
          { label: 'Medio de pago', value: 'Débito' },
          { label: 'Estado', value: <Badge tone="success">Vigente</Badge> },
          { label: 'Nota', value: 'Mercado de la semana' },
        ]}
      />
    </Example>
  );
}
