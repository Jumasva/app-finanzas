'use client';

import { Button } from '@/components/ui/atoms/Button';
import { PlusIcon, SearchIcon } from '@/components/ui/atoms/icons';
import { EmptyState } from '@/components/ui/molecules/EmptyState';
import { Gallery, Playground, Row } from '../_components/Playground';

export function EmptyStatePlayground() {
  return (
    <>
      <Playground
        component="EmptyState"
        importFrom="@/components/ui/molecules/EmptyState"
        controls={[
          { type: 'icon', prop: 'icon', default: 'ReceiptIcon', required: true },
          { type: 'text', prop: 'title', default: 'Aún no tienes movimientos' },
          {
            type: 'text',
            prop: 'description',
            default: 'Registra tu primer gasto o ingreso para empezar a ver tu resumen.',
          },
          { type: 'select', prop: 'tone', options: ['brand', 'neutral', 'danger'], default: 'brand' },
          { type: 'select', prop: 'size', options: ['md', 'lg'], default: 'md' },
          { type: 'boolean', prop: 'bordered', default: true },
        ]}
        codeProps={['action={<ButtonLink href="/movimientos/nuevo" iconLeft={PlusIcon}>Nuevo movimiento</ButtonLink>}']}
        render={(props) => (
          <EmptyState
            {...(props as React.ComponentProps<typeof EmptyState>)}
            action={<Button iconLeft={PlusIcon}>Nuevo movimiento</Button>}
            className="w-full max-w-sm"
          />
        )}
      />

      <Gallery>
        <Row label="sin resultados" className="w-full max-w-sm">
          <EmptyState
            bordered
            icon={SearchIcon}
            title="Sin resultados"
            description="No encontramos movimientos con «gimnasio». Prueba con otra palabra."
            action={<Button variant="secondary">Limpiar búsqueda</Button>}
            className="w-full"
          />
        </Row>
      </Gallery>
    </>
  );
}
