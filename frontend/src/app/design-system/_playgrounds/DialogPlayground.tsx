'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/atoms/Badge';
import { Button } from '@/components/ui/atoms/Button';
import { AmountEntry } from '@/components/ui/molecules/AmountEntry';
import { DateField } from '@/components/ui/molecules/DateField';
import { DetailList } from '@/components/ui/molecules/DetailList';
import { FormField } from '@/components/ui/molecules/FormField';
import { SegmentedControl } from '@/components/ui/molecules/SegmentedControl';
import { Dialog } from '@/components/ui/organisms/Dialog';
import { todayIso } from '@/lib/date';
import { Example } from '../_components/Playground';

export function DialogPlayground() {
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [kind, setKind] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<string | null>(todayIso());

  return (
    <>
      <Example
        title="Modal · crear un movimiento"
        code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Nuevo movimiento"
  busy={guardando}
  footer={
    <>
      <Button variant="secondary" size="lg" onClick={() => setOpen(false)}>Cancelar</Button>
      <Button size="lg" type="submit" form="nuevo-movimiento" loading={guardando}>Guardar egreso</Button>
    </>
  }
>
  <form id="nuevo-movimiento">…</form>
</Dialog>`}
      >
        <Button onClick={() => setModal(true)}>Abrir modal</Button>
        <Dialog
          open={modal}
          onClose={() => setModal(false)}
          title="Nuevo movimiento"
          footer={
            <>
              <Button variant="secondary" size="lg" onClick={() => setModal(false)}>
                Cancelar
              </Button>
              <Button size="lg" onClick={() => setModal(false)}>
                {kind === 'expense' ? 'Guardar egreso' : 'Guardar ingreso'}
              </Button>
            </>
          }
        >
          <div className="flex flex-col gap-5">
            <SegmentedControl
              label="Tipo de movimiento"
              options={[
                { value: 'expense', label: 'Egreso' },
                { value: 'income', label: 'Ingreso' },
              ]}
              value={kind}
              onChange={setKind}
              className="w-full"
            />
            <AmountEntry kind={kind} value={amount} onValueChange={setAmount} />
            <DateField label="Fecha" value={date} onChange={setDate} max={todayIso()} />
            <FormField label="Descripción" optional placeholder="Ej. Mercado de la semana" />
          </div>
        </Dialog>
      </Example>

      <Example
        title="Drawer · ver el detalle"
        code={`<Dialog placement="side" open={open} onClose={cerrar} title="Detalle del movimiento" footer={…}>
  <DetailList items={…} />
</Dialog>`}
      >
        <Button variant="secondary" onClick={() => setDrawer(true)}>
          Abrir drawer
        </Button>
        <Dialog
          placement="side"
          open={drawer}
          onClose={() => setDrawer(false)}
          title="Detalle del movimiento"
          footer={
            <Button variant="secondary" size="lg" className="flex-1" onClick={() => setDrawer(false)}>
              Editar
            </Button>
          }
        >
          <DetailList
            items={[
              { label: 'Fecha', value: '24 oct 2026' },
              { label: 'Categoría', value: 'Alimentación' },
              { label: 'Medio de pago', value: 'Débito' },
              { label: 'Estado', value: <Badge tone="success">Vigente</Badge> },
              { label: 'Nota', value: 'Mercado de la semana' },
            ]}
          />
        </Dialog>
      </Example>
    </>
  );
}
