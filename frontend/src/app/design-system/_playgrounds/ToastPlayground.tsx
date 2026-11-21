'use client';

import { Button } from '@/components/ui/atoms/Button';
import { Toast } from '@/components/ui/molecules/Toast';
import { useToast } from '@/components/ui/organisms/ToastProvider';
import { Example, Playground } from '../_components/Playground';

export function ToastPlayground() {
  const toast = useToast();

  return (
    <>
      <Playground
        component="Toast"
        importFrom="@/components/ui/molecules/Toast"
        controls={[
          { type: 'text', prop: 'message', default: 'Movimiento guardado' },
          { type: 'select', prop: 'tone', options: ['success', 'danger', 'neutral'], default: 'success' },
          { type: 'boolean', prop: 'action', code: "action={{ label: 'Reintentar', onClick: guardar }}" },
          { type: 'boolean', prop: 'onClose', default: true, code: 'onClose={() => …}' },
        ]}
        render={(props) => (
          <Toast
            {...(props as React.ComponentProps<typeof Toast>)}
            action={props.action ? { label: 'Reintentar', onClick: () => {} } : undefined}
            onClose={props.onClose ? () => {} : undefined}
          />
        )}
      />

      <Example
        title="En una pantalla: useToast() · abajo a la izquierda (arriba en móvil), máximo 3"
        code={`const toast = useToast();

toast({ message: 'Movimiento guardado', tone: 'success' });
toast({ message: 'No se pudo guardar', tone: 'danger', action: { label: 'Reintentar', onClick: guardar } });`}
      >
        <Button variant="secondary" onClick={() => toast({ message: 'Movimiento guardado', tone: 'success' })}>
          Éxito
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({ message: 'No se pudo guardar', tone: 'danger', action: { label: 'Reintentar', onClick: () => {} } })
          }
        >
          Error con acción
        </Button>
        <Button variant="secondary" onClick={() => toast({ message: 'Exportando informe…' })}>
          Neutral
        </Button>
      </Example>
    </>
  );
}
