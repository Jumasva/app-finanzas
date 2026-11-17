'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { FormField } from '@/components/ui/molecules/FormField';
import { ConfirmDialog } from '@/components/ui/organisms/ConfirmDialog';
import { useToast } from '@/components/ui/organisms/ToastProvider';
import { Example, Playground } from '../_components/Playground';

function ConfirmDialogDemo(props: Omit<React.ComponentProps<typeof ConfirmDialog>, 'open' | 'onClose' | 'onConfirm'>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Abrir
      </Button>
      <ConfirmDialog {...props} open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} />
    </>
  );
}

export function ConfirmDialogPlayground() {
  const [voiding, setVoiding] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const toast = useToast();

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
          { type: 'select', prop: 'tone', options: ['danger', 'default'], default: 'danger' },
          { type: 'boolean', prop: 'loading' },
        ]}
        render={(props) => <ConfirmDialogDemo {...(props as React.ComponentProps<typeof ConfirmDialogDemo>)} />}
        codeProps={['open={open}', 'onClose={cerrar}', 'onConfirm={anular}']}
      />
      <Example
        title="Anular un registro"
        code={`<ConfirmDialog
  open={open}
  onClose={() => setOpen(false)}
  onConfirm={anular}
  loading={anulando}
  title='¿Anular el egreso "Mercado" de $120.000?'
  description="Deja de contar en tu saldo. Una anulación no se puede deshacer."
  confirmLabel="Anular"
/>`}
      >
        <Button variant="destructive" onClick={() => setVoiding(true)}>
          Anular egreso
        </Button>
        <ConfirmDialog
          open={voiding}
          onClose={() => setVoiding(false)}
          onConfirm={() => {
            setVoiding(false);
            toast({ message: 'Egreso anulado', tone: 'success' });
          }}
          title='¿Anular el egreso "Mercado" de $120.000?'
          description="Deja de contar en tu saldo. Una anulación no se puede deshacer."
          confirmLabel="Anular"
        />
      </Example>

      <Example
        title="Con un campo: desactivar la cuenta"
        code={`<ConfirmDialog … confirmLabel="Desactivar cuenta">
  <FormField label="Contraseña" type="password" error={fieldErrors.password} />
</ConfirmDialog>`}
      >
        <Button variant="secondary" onClick={() => setDeactivating(true)}>
          Desactivar cuenta
        </Button>
        <ConfirmDialog
          open={deactivating}
          onClose={() => setDeactivating(false)}
          onConfirm={() => setDeactivating(false)}
          title="¿Desactivar tu cuenta?"
          description="Se cerrarán todas tus sesiones. Tu información se conserva y puedes reactivarla desde tu correo."
          confirmLabel="Desactivar cuenta"
        >
          <FormField label="Contraseña" type="password" autoComplete="current-password" />
        </ConfirmDialog>
      </Example>
    </>
  );
}
