'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { AmountEntry } from '@/components/ui/molecules/AmountEntry';
import { DateField } from '@/components/ui/molecules/DateField';
import { FormField } from '@/components/ui/molecules/FormField';
import { SegmentedControl } from '@/components/ui/molecules/SegmentedControl';
import { Dialog } from '@/components/ui/organisms/Dialog';
import { todayIso } from '@/lib/date';
import { Example, Playground } from '../_components/Playground';

// La vista abre y cierra el diálogo con un botón
function DialogDemo({
  children = <p className="text-body text-content-secondary">Contenido del diálogo.</p>,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, 'open' | 'onClose' | 'footer'>) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir</Button>
      <Dialog
        {...props}
        open={open}
        onClose={close}
        footer={
          <>
            <Button variant="secondary" size="lg" onClick={close}>
              Cancelar
            </Button>
            <Button size="lg" onClick={close}>
              Guardar
            </Button>
          </>
        }
      >
        {children}
      </Dialog>
    </>
  );
}

// Formulario de ejemplo: lo que va dentro del modal de nuevo movimiento
function MovementForm() {
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<string | null>(todayIso());

  return (
    <div className="flex flex-col gap-5">
      <SegmentedControl
        label="Tipo de movimiento"
        options={[
          { value: 'expense', label: 'Egreso' },
          { value: 'income', label: 'Ingreso' },
        ]}
        value={type}
        onChange={setType}
        className="w-full"
      />
      <AmountEntry type={type} value={amount} onValueChange={setAmount} />
      <DateField label="Fecha" value={date} onChange={setDate} max={todayIso()} />
      <FormField label="Descripción" optional placeholder="Ej. Mercado de la semana" />
    </div>
  );
}

export function DialogPlayground() {
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
        codeProps={['open={open}', 'onClose={() => setOpen(false)}', 'footer={…}']}
        render={(props) => <DialogDemo {...(props as React.ComponentProps<typeof DialogDemo>)} />}
      />

      <Example
        title="Con un formulario"
        code={`<Dialog open={open} onClose={cerrar} title="Nuevo movimiento" busy={guardando} footer={…}>
  <SegmentedControl … />
  <AmountEntry type={type} value={amount} onValueChange={setAmount} />
  <DateField label="Fecha" value={date} onChange={setDate} max={todayIso()} />
</Dialog>`}
      >
        <DialogDemo title="Nuevo movimiento">
          <MovementForm />
        </DialogDemo>
      </Example>
    </>
  );
}
