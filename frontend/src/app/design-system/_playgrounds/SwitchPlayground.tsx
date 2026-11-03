'use client';

import { Switch } from '@/components/ui/atoms/Switch';
import { Gallery, Playground, Row } from '../_components/Playground';

export function SwitchPlayground() {
  return (
    <>
      <Playground
        component="Switch"
        importFrom="@/components/ui/atoms/Switch"
        controls={[
          { type: 'text', prop: 'children', default: 'Notificaciones' },
          { type: 'select', prop: 'size', options: ['md', 'lg'], default: 'md' },
          { type: 'boolean', prop: 'defaultChecked' },
          { type: 'boolean', prop: 'disabled' },
        ]}
        render={(props) => <Switch {...(props as React.ComponentProps<typeof Switch>)} />}
      />

      <Gallery>
        <Row label="off · 36 × 20">
          <Switch>Notificaciones</Switch>
          <Switch disabled>Notificaciones</Switch>
        </Row>
        <Row label="on · 36 × 20">
          <Switch defaultChecked>Notificaciones</Switch>
          <Switch defaultChecked disabled>
            Notificaciones
          </Switch>
        </Row>
        <Row label="lg · 44 × 24">
          <Switch size="lg">Modo oscuro</Switch>
          <Switch size="lg" defaultChecked>
            Modo oscuro
          </Switch>
        </Row>
      </Gallery>
    </>
  );
}
