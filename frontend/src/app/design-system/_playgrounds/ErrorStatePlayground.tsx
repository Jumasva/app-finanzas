'use client';

import { Button } from '@/components/ui/atoms/Button';
import { AlertIcon, RefreshIcon, SearchIcon, WifiOffIcon } from '@/components/ui/atoms/icons';
import { ErrorState } from '@/components/ui/organisms/ErrorState';
import { Example, Playground } from '../_components/Playground';

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
        codeProps={['actions={<Button onClick={reintentar}>Reintentar</Button>}']}
      />
      <Example
        title="Variantes"
        code={`<ErrorState
  icon={WifiOffIcon}
  title="Sin conexión"
  description="Revisa tu internet e inténtalo de nuevo."
  actions={<Button variant="secondary" iconLeft={RefreshIcon} onClick={reintentar}>Reintentar</Button>}
/>`}
      >
        <div className="grid w-full gap-4 lg:grid-cols-3">
          <ErrorState
            className="rounded-xl border border-border-subtle"
            icon={WifiOffIcon}
            title="Sin conexión"
            description="Revisa tu internet e inténtalo de nuevo."
            actions={
              <Button variant="secondary" iconLeft={RefreshIcon}>
                Reintentar
              </Button>
            }
          />
          <ErrorState
            className="rounded-xl border border-border-subtle"
            icon={SearchIcon}
            title="Página no encontrada"
            description="La página que buscas no existe o se movió."
            actions={<Button>Ir al inicio</Button>}
          />
          <ErrorState
            className="rounded-xl border border-border-subtle"
            tone="danger"
            icon={AlertIcon}
            title="Algo salió mal"
            description="No pudimos cargar esta pantalla. Inténtalo en unos minutos."
            actions={
              <Button variant="secondary" iconLeft={RefreshIcon}>
                Reintentar
              </Button>
            }
          />
        </div>
      </Example>
    </>
  );
}
