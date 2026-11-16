'use client';

import { Button } from '@/components/ui/atoms/Button';
import { Toast } from '@/components/ui/molecules/Toast';
import { useToast } from '@/components/ui/organisms/ToastProvider';
import { Example, Gallery, Row } from '../_components/Playground';

export function ToastPlayground() {
  const toast = useToast();

  return (
    <>
      <Example
        title="useToast() · abajo a la izquierda (arriba en móvil), máximo 3"
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

      <Gallery>
        <Row label="success">
          <Toast tone="success" message="Movimiento guardado" onClose={() => {}} />
        </Row>
        <Row label="danger + acción">
          <Toast
            tone="danger"
            message="No se pudo guardar"
            action={{ label: 'Reintentar', onClick: () => {} }}
            onClose={() => {}}
          />
        </Row>
        <Row label="neutral">
          <Toast message="Exportando informe…" onClose={() => {}} />
        </Row>
      </Gallery>
    </>
  );
}
