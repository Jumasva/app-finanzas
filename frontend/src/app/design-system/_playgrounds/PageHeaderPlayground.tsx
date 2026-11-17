'use client';

import { Button } from '@/components/ui/atoms/Button';
import { DownloadIcon, PlusIcon } from '@/components/ui/atoms/icons';
import { PageHeader } from '@/components/ui/organisms/PageHeader';
import { Playground } from '../_components/Playground';

export function PageHeaderPlayground() {
  return (
    <Playground
      component="PageHeader"
      importFrom="@/components/ui/organisms/PageHeader"
      controls={[
        { type: 'text', prop: 'title', default: 'Movimientos' },
        { type: 'text', prop: 'description', default: '248 movimientos en octubre · Egresos $2.180.400' },
        { type: 'select', prop: 'titleAs', options: ['h2', 'h1'], default: 'h2' },
      ]}
      codeProps={['actions={<ButtonLink href="/movimientos/nuevo" iconLeft={PlusIcon}>Nuevo movimiento</ButtonLink>}']}
      render={(props) => (
        <PageHeader
          {...(props as React.ComponentProps<typeof PageHeader>)}
          className="w-full"
          actions={
            <>
              <Button variant="secondary" iconLeft={DownloadIcon}>
                Exportar
              </Button>
              <Button iconLeft={PlusIcon}>Nuevo movimiento</Button>
            </>
          }
        />
      )}
    />
  );
}
