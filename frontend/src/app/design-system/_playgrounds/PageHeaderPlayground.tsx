'use client';

import { Button } from '@/components/ui/atoms/Button';
import { DownloadIcon, PlusIcon } from '@/components/ui/atoms/icons';
import { PageHeader } from '@/components/ui/organisms/PageHeader';
import { Example } from '../_components/Playground';

export function PageHeaderPlayground() {
  return (
    <Example
      title="Encabezado de página (la miga de pan va en la Topbar)"
      code={`<PageHeader
  title="Movimientos"
  description="248 movimientos en octubre · Egresos $2.180.400 · Ingresos $4.250.000"
  actions={<>
    <Button variant="secondary" iconLeft={DownloadIcon}>Exportar</Button>
    <ButtonLink href="/movimientos/nuevo" iconLeft={PlusIcon}>Nuevo movimiento</ButtonLink>
  </>}
/>`}
    >
      <PageHeader
        className="w-full"
        title="Movimientos"
        description="248 movimientos en octubre · Egresos $2.180.400 · Ingresos $4.250.000"
        actions={
          <>
            <Button variant="secondary" iconLeft={DownloadIcon}>
              Exportar
            </Button>
            <Button iconLeft={PlusIcon}>Nuevo movimiento</Button>
          </>
        }
      />
    </Example>
  );
}
