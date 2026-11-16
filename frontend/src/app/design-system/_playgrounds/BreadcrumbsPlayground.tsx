'use client';

import { Breadcrumbs } from '@/components/ui/molecules/Breadcrumbs';
import { Gallery, Row } from '../_components/Playground';

export function BreadcrumbsPlayground() {
  return (
    <Gallery>
      <Row label="una página">
        <Breadcrumbs items={[{ label: 'Movimientos', href: '/movimientos' }]} />
      </Row>
      <Row label="detalle">
        <Breadcrumbs
          items={[
            { label: 'Movimientos', href: '/movimientos' },
            { label: 'Mercado Éxito', href: '/movimientos/12' },
          ]}
        />
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
  );
}
