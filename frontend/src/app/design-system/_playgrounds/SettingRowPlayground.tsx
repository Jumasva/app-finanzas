'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { BellIcon, LockIcon } from '@/components/ui/atoms/icons';
import { Switch } from '@/components/ui/atoms/Switch';
import { SettingRow } from '@/components/ui/molecules/SettingRow';
import { Gallery, Playground, Row } from '../_components/Playground';

export function SettingRowPlayground() {
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      <Playground
        component="SettingRow"
        importFrom="@/components/ui/molecules/SettingRow"
        controls={[
          { type: 'icon', prop: 'icon', default: 'WalletIcon', required: true },
          { type: 'text', prop: 'title', default: 'Moneda principal' },
          { type: 'text', prop: 'description', default: '' },
          { type: 'text', prop: 'value', default: 'COP · Peso' },
          { type: 'boolean', prop: 'href', default: true, code: 'href="/ajustes/moneda"' },
          { type: 'boolean', prop: 'danger' },
        ]}
        render={(props) => (
          <SettingRow
            {...(props as React.ComponentProps<typeof SettingRow>)}
            href={props.href ? '#' : undefined}
            className="w-full max-w-xl rounded-xl border border-border-subtle"
          />
        )}
      />

      <Gallery title="Con un control a la derecha">
        <Row label="switch" className="w-full max-w-xl">
          <SettingRow
            icon={BellIcon}
            title="Avisos"
            description="Pagos próximos y obligaciones vencidas"
            className="rounded-xl border border-border-subtle"
            control={
              <Switch checked={notifications} onChange={(event) => setNotifications(event.target.checked)}>
                <span className="sr-only">Avisos</span>
              </Switch>
            }
          />
        </Row>
        <Row label="botón" className="w-full max-w-xl">
          <SettingRow
            icon={LockIcon}
            title="Contraseña"
            description="Cámbiala con tu contraseña actual"
            className="rounded-xl border border-border-subtle"
            control={
              <Button variant="secondary" size="sm">
                Cambiar
              </Button>
            }
          />
        </Row>
      </Gallery>
    </>
  );
}
