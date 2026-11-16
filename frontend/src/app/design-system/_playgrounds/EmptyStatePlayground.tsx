'use client';

import { Button } from '@/components/ui/atoms/Button';
import { PlusIcon, ReceiptIcon, SearchIcon, TargetIcon } from '@/components/ui/atoms/icons';
import { EmptyState } from '@/components/ui/molecules/EmptyState';
import { Example } from '../_components/Playground';

export function EmptyStatePlayground() {
  return (
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
  );
}
