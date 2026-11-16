'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { PlusIcon } from '@/components/ui/atoms/icons';
import { TextLink } from '@/components/ui/atoms/TextLink';
import { SectionHeader } from '@/components/ui/molecules/SectionHeader';
import { SegmentedControl } from '@/components/ui/molecules/SegmentedControl';
import { Gallery, Row } from '../_components/Playground';

export function SectionHeaderPlayground() {
  const [period, setPeriod] = useState<'month' | 'year'>('month');

  return (
    <Gallery>
      <Row label="título + acción" className="w-full max-w-xl">
        <SectionHeader
          title="Movimientos recientes"
          action={<TextLink href="#">Ver todo</TextLink>}
          className="w-full"
        />
      </Row>
      <Row label="contador y descripción" className="w-full max-w-xl">
        <SectionHeader
          title="Pagos próximos"
          count={4}
          description="En los próximos 15 días"
          action={<TextLink href="#">Ver todo</TextLink>}
          className="w-full"
        />
      </Row>
      <Row label="con control" className="w-full max-w-xl">
        <SectionHeader
          title="Gastos por categoría"
          action={
            <SegmentedControl
              label="Periodo"
              size="sm"
              options={[
                { value: 'month', label: 'Mes' },
                { value: 'year', label: 'Año' },
              ]}
              value={period}
              onChange={setPeriod}
            />
          }
          className="w-full"
        />
      </Row>
      <Row label="con botón" className="w-full max-w-xl">
        <SectionHeader
          title="Mis objetivos"
          action={
            <Button variant="secondary" size="sm" iconLeft={PlusIcon}>
              Nuevo objetivo
            </Button>
          }
          className="w-full"
        />
      </Row>
    </Gallery>
  );
}
