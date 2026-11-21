'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { PlusIcon } from '@/components/ui/atoms/icons';
import { TextLink } from '@/components/ui/atoms/TextLink';
import { SectionHeader } from '@/components/ui/molecules/SectionHeader';
import { SegmentedControl } from '@/components/ui/molecules/SegmentedControl';
import { Gallery, Playground, Row } from '../_components/Playground';

export function SectionHeaderPlayground() {
  const [period, setPeriod] = useState<'month' | 'year'>('month');

  return (
    <>
      <Playground
        component="SectionHeader"
        importFrom="@/components/ui/molecules/SectionHeader"
        controls={[
          { type: 'text', prop: 'title', default: 'Pagos próximos' },
          { type: 'number', prop: 'count', default: 4 },
          { type: 'text', prop: 'description', default: 'En los próximos 15 días' },
          { type: 'select', prop: 'as', options: ['h2', 'h3'], default: 'h2' },
        ]}
        codeProps={['action={<TextLink href="/recordatorios">Ver todo</TextLink>}']}
        render={(props) => (
          <SectionHeader
            {...(props as React.ComponentProps<typeof SectionHeader>)}
            action={<TextLink href="#">Ver todo</TextLink>}
            className="w-full max-w-xl"
          />
        )}
      />

      <Gallery title="Otras acciones">
        <Row label="segmented" className="w-full max-w-xl">
          <SectionHeader
            title="Gastos por categoría"
            className="w-full"
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
          />
        </Row>
        <Row label="botón" className="w-full max-w-xl">
          <SectionHeader
            title="Mis objetivos"
            className="w-full"
            action={
              <Button variant="secondary" size="sm" iconLeft={PlusIcon}>
                Nuevo objetivo
              </Button>
            }
          />
        </Row>
      </Gallery>
    </>
  );
}
