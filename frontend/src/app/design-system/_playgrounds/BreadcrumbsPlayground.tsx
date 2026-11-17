'use client';

import { Breadcrumbs } from '@/components/ui/molecules/Breadcrumbs';
import { Gallery, Playground, Row } from '../_components/Playground';

const detail = [
  { label: 'Movimientos', href: '/movimientos' },
  { label: 'Mercado Éxito', href: '/movimientos/12' },
];

export function BreadcrumbsPlayground() {
  return (
    <>
      <Playground
        component="Breadcrumbs"
        importFrom="@/components/ui/molecules/Breadcrumbs"
        controls={[{ type: 'select', prop: 'currentAs', options: ['span', 'h1'], default: 'span' }]}
        codeProps={['items={breadcrumbs(pathname)}']}
        render={(props) => <Breadcrumbs {...(props as React.ComponentProps<typeof Breadcrumbs>)} items={detail} />}
      />

      <Gallery>
        <Row label="una página">
          <Breadcrumbs items={[{ label: 'Movimientos', href: '/movimientos' }]} />
        </Row>
        <Row label="tres niveles">
          <Breadcrumbs
            items={[
              { label: 'Ajustes', href: '/ajustes' },
              { label: 'Seguridad', href: '/ajustes/seguridad' },
              { label: 'Contraseña', href: '/ajustes/seguridad/contrasena' },
            ]}
          />
        </Row>
      </Gallery>
    </>
  );
}
