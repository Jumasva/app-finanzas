'use client';

import { Button } from '@/components/ui/atoms/Button';
import { RefreshIcon, SearchIcon } from '@/components/ui/atoms/icons';
import { ErrorState } from '@/components/ui/organisms/ErrorState';
import { Gallery, Playground, Row } from '../_components/Playground';

export function ErrorStatePlayground() {
  return (
    <>
      <Playground
        component="ErrorState"
        importFrom="@/components/ui/organisms/ErrorState"
        controls={[
          { type: 'icon', prop: 'icon', default: 'WifiOffIcon', required: true },
          { type: 'text', prop: 'title', default: 'Sin conexión' },
          { type: 'text', prop: 'description', default: 'Revisa tu internet e inténtalo de nuevo.' },
          { type: 'select', prop: 'tone', options: ['neutral', 'danger'], default: 'neutral' },
        ]}
        codeProps={[
          'actions={<Button variant="secondary" iconLeft={RefreshIcon} onClick={reintentar}>Reintentar</Button>}',
        ]}
        render={(props) => (
          <ErrorState
            {...(props as React.ComponentProps<typeof ErrorState>)}
            actions={
              <Button variant="secondary" iconLeft={RefreshIcon}>
                Reintentar
              </Button>
            }
          />
        )}
      />

      <Gallery>
        <Row label="404" className="w-full">
          <ErrorState
            icon={SearchIcon}
            title="Página no encontrada"
            description="La página que buscas no existe o se movió."
            actions={<Button>Ir al inicio</Button>}
            className="w-full"
          />
        </Row>
      </Gallery>
    </>
  );
}
