'use client';

import { Button } from '@/components/ui/atoms/Button';
import { PlusIcon, ReceiptIcon, SearchIcon, TargetIcon } from '@/components/ui/atoms/icons';
import { EmptyState } from '@/components/ui/molecules/EmptyState';
import { Example, Playground } from '../_components/Playground';

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
          { type: 'boolean', prop: 'bordered', default: true },
        ]}
        render={(props) => (
          <EmptyState
            {...(props as React.ComponentProps<typeof EmptyState>)}
            action={<Button iconLeft={PlusIcon}>Nuevo movimiento</Button>}
            className="w-full max-w-sm"
          />
        )}
        codeProps={['action={<ButtonLink href="/movimientos/nuevo">Nuevo movimiento</ButtonLink>}']}
      />
      <Example
        title="Variantes"
        code={`<EmptyState
  icon={ReceiptIcon}
  title="Aún no tienes movimientos"
  description="Registra tu primer gasto o ingreso para empezar a ver tu resumen."
  action={<ButtonLink href="/movimientos/nuevo" iconLeft={PlusIcon}>Nuevo movimiento</ButtonLink>}
/>`}
      >
        <div className="grid w-full gap-4 lg:grid-cols-3">
          <EmptyState
            bordered
            icon={ReceiptIcon}
            title="Aún no tienes movimientos"
            description="Registra tu primer gasto o ingreso para empezar a ver tu resumen."
            action={<Button iconLeft={PlusIcon}>Nuevo movimiento</Button>}
          />
          <EmptyState
            bordered
            icon={TargetIcon}
            title="Sin objetivos de ahorro"
            description="Define cuánto quieres ahorrar y para cuándo."
            action={<Button iconLeft={PlusIcon}>Crear objetivo</Button>}
          />
          <EmptyState
            bordered
            icon={SearchIcon}
            title="Sin resultados"
            description="No encontramos movimientos con «gimnasio». Prueba con otra palabra."
            action={<Button variant="secondary">Limpiar búsqueda</Button>}
          />
        </div>
      </Example>
    </>
  );
}
