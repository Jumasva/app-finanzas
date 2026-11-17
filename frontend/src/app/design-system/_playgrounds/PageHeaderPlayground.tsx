'use client';

import { Button } from '@/components/ui/atoms/Button';
import { DownloadIcon, PlusIcon } from '@/components/ui/atoms/icons';
import { PageHeader } from '@/components/ui/organisms/PageHeader';
import { Example, Playground } from '../_components/Playground';

export function PageHeaderPlayground() {
  return (
    <>
      <Playground
        component="PageHeader"
        importFrom="@/components/ui/organisms/PageHeader"
        controls={[
          { type: 'text', prop: 'title', default: 'Movimientos' },
          { type: 'text', prop: 'description', default: '248 movimientos en octubre' },
          { type: 'select', prop: 'titleAs', options: ['h2', 'h1'], default: 'h2' },
        ]}
        render={(props) => (
          <PageHeader
            {...(props as React.ComponentProps<typeof PageHeader>)}
            actions={<Button iconLeft={PlusIcon}>Nuevo movimiento</Button>}
            className="w-full"
          />
        )}
        codeProps={['actions={<ButtonLink href="/movimientos/nuevo">Nuevo movimiento</ButtonLink>}']}
      />
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
    </>
  );
}
