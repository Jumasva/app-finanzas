'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { FormField } from '@/components/ui/molecules/FormField';
import { ConfirmDialog } from '@/components/ui/organisms/ConfirmDialog';
import { Example, Playground } from '../_components/Playground';

// La vista abre la confirmación con un botón
function ConfirmDialogDemo({
  trigger = 'Abrir',
  ...props
}: Omit<React.ComponentProps<typeof ConfirmDialog>, 'open' | 'onClose' | 'onConfirm'> & { trigger?: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {trigger}
      </Button>
      <ConfirmDialog {...props} open={open} onClose={close} onConfirm={close} />
    </>
  );
}

export function ConfirmDialogPlayground() {
  return (
    <>
      <Playground
        component="ConfirmDialog"
        importFrom="@/components/ui/organisms/ConfirmDialog"
        controls={[
          { type: 'text', prop: 'title', default: '¿Anular el egreso "Mercado" de $120.000?' },
          {
            type: 'text',
            prop: 'description',
            default: 'Deja de contar en tu saldo. Una anulación no se puede deshacer.',
          },
          { type: 'text', prop: 'confirmLabel', default: 'Anular' },
          { type: 'text', prop: 'cancelLabel', default: 'Cancelar' },
          { type: 'select', prop: 'tone', options: ['danger', 'brand'], default: 'danger' },
          { type: 'boolean', prop: 'loading' },
        ]}
        codeProps={['open={open}', 'onClose={cerrar}', 'onConfirm={anular}']}
        render={(props) => <ConfirmDialogDemo {...(props as React.ComponentProps<typeof ConfirmDialogDemo>)} />}
      />

      <Example
        title="Con un campo: desactivar la cuenta"
        code={`<ConfirmDialog … confirmLabel="Desactivar cuenta">
  <FormField label="Contraseña" type="password" error={fieldErrors.password} />
</ConfirmDialog>`}
      >
        <ConfirmDialogDemo
          trigger="Desactivar cuenta"
          title="¿Desactivar tu cuenta?"
          description="Se cerrarán todas tus sesiones. Tu información se conserva y puedes reactivarla desde tu correo."
          confirmLabel="Desactivar cuenta"
        >
          <FormField label="Contraseña" type="password" autoComplete="current-password" />
        </ConfirmDialogDemo>
      </Example>
    </>
  );
}
