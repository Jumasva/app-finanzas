'use client';

import { HelperText } from '@/components/ui/atoms/HelperText';
import { Gallery, Playground, Row } from '../_components/Playground';

export function HelperTextPlayground() {
  return (
    <>
      <Playground
        component="HelperText"
        importFrom="@/components/ui/atoms/HelperText"
        staticProps={{ id: 'email-helper' }}
        controls={[
          { type: 'select', prop: 'variant', options: ['info', 'error', 'success'], default: 'info' },
          { type: 'text', prop: 'children', default: 'Usaremos este correo para enviarte tus reportes.' },
        ]}
        render={(props) => <HelperText {...(props as React.ComponentProps<typeof HelperText>)} />}
      />

      <Gallery>
        <Row label="info">
          <HelperText>Usaremos este correo para enviarte tus reportes.</HelperText>
        </Row>
        <Row label="error">
          <HelperText variant="error">El correo debe incluir @.</HelperText>
        </Row>
        <Row label="success">
          <HelperText variant="success">Correo verificado.</HelperText>
        </Row>
      </Gallery>
    </>
  );
}
