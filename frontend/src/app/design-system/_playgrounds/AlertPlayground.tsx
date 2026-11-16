'use client';

import { Alert } from '@/components/ui/atoms/Alert';
import { TextLink } from '@/components/ui/atoms/TextLink';
import { Gallery, Playground, Row } from '../_components/Playground';

const variants = ['info', 'success', 'warning', 'error'] as const;

export function AlertPlayground() {
  return (
    <>
      <Playground
        component="Alert"
        importFrom="@/components/ui/atoms/Alert"
        controls={[
          { type: 'select', prop: 'variant', options: variants, default: 'info' },
          { type: 'text', prop: 'title', default: 'Nuevo informe disponible' },
          { type: 'text', prop: 'children', default: 'Tu resumen de octubre ya está listo para descargar.' },
          { type: 'boolean', prop: 'onClose', code: 'onClose={() => …}' },
        ]}
        render={(props) => (
          <Alert
            {...(props as React.ComponentProps<typeof Alert>)}
            onClose={props.onClose ? () => {} : undefined}
            className="w-full max-w-md"
          />
        )}
      />

      <Gallery>
        <Row label="con título y acción" className="grid w-full gap-4 md:grid-cols-2">
          <Alert
            variant="info"
            title="Nuevo informe disponible"
            action={<TextLink href="#">Ver informe</TextLink>}
            onClose={() => {}}
          >
            Tu resumen de octubre ya está listo para descargar.
          </Alert>
          <Alert variant="success" title="Objetivo cumplido" onClose={() => {}}>
            Ahorraste $2.000.000 para tus vacaciones.
          </Alert>
          <Alert variant="warning" title="Tarjeta cerca del cupo" action={<TextLink href="#">Ver tarjeta</TextLink>}>
            Te quedan $60.000 de cupo en la Visa.
          </Alert>
          <Alert variant="error" title="Pago vencido" action={<TextLink href="#">Registrar pago</TextLink>}>
            El arriendo venció hace 2 días.
          </Alert>
        </Row>
        <Row label="solo mensaje (formularios)" className="w-full max-w-md">
          <Alert variant="error">El correo o la contraseña no son válidos.</Alert>
        </Row>
      </Gallery>
    </>
  );
}
