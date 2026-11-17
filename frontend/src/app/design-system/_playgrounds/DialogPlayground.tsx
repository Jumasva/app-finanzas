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
import { Example, Playground } from '../_components/Playground';

// La vista abre y cierra el diálogo con un botón
function DialogDemo(props: Omit<React.ComponentProps<typeof Dialog>, 'open' | 'onClose' | 'footer'>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir</Button>
      <Dialog
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <Button size="lg" onClick={() => setOpen(false)}>
            Listo
          </Button>
        }
      >
        <p className="text-body text-content-secondary">Contenido del diálogo.</p>
      </Dialog>
    </>
  );
}

export function DialogPlayground() {
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [kind, setKind] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<string | null>(todayIso());

  return (
    <>
      <Playground
        component="Dialog"
        importFrom="@/components/ui/organisms/Dialog"
        controls={[
          { type: 'text', prop: 'title', default: 'Nuevo movimiento' },
          { type: 'text', prop: 'description', default: '' },
          { type: 'select', prop: 'placement', options: ['center', 'side'], default: 'center' },
          { type: 'boolean', prop: 'busy' },
        ]}
        render={(props) => <DialogDemo {...(props as React.ComponentProps<typeof DialogDemo>)} />}
        codeProps={['open={open}', 'onClose={() => setOpen(false)}', 'footer={…}']}
      />
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
