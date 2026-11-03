'use client';

import { Chip } from '@/components/ui/atoms/Chip';
import { UtensilsIcon } from '@/components/ui/atoms/icons';
import { Gallery, Playground, Row } from '../_components/Playground';

export function ChipPlayground() {
  return (
    <>
      <Playground
        component="Chip"
        importFrom="@/components/ui/atoms/Chip"
        controls={[
          { type: 'text', prop: 'children', default: 'Este mes' },
          { type: 'boolean', prop: 'selected' },
          { type: 'icon', prop: 'icon' },
          { type: 'boolean', prop: 'onRemove', code: 'onRemove={() => quitar()}' },
          { type: 'text', prop: 'removeLabel', default: '' },
          { type: 'boolean', prop: 'disabled' },
        ]}
        // En la vista, onRemove no hace nada: solo muestra la ×
        render={({ onRemove, ...props }) => (
          <Chip {...(props as React.ComponentProps<typeof Chip>)} onRemove={onRemove ? () => {} : undefined} />
        )}
      />

      <Gallery>
        <Row label="filtro">
          <Chip>Este mes</Chip>
          <Chip selected>Este mes</Chip>
          <Chip disabled>Este mes</Chip>
        </Row>
        <Row label="con ícono">
          <Chip icon={UtensilsIcon}>Alimentación</Chip>
          <Chip icon={UtensilsIcon} selected>
            Alimentación
          </Chip>
          <Chip icon={UtensilsIcon} disabled>
            Alimentación
          </Chip>
        </Row>
        <Row label="removible">
          <Chip onRemove={() => {}} removeLabel="Quitar Transporte">
            Transporte
          </Chip>
          <Chip selected onRemove={() => {}} removeLabel="Quitar Transporte">
            Transporte
          </Chip>
          <Chip disabled onRemove={() => {}} removeLabel="Quitar Transporte">
            Transporte
          </Chip>
        </Row>
      </Gallery>
    </>
  );
}
