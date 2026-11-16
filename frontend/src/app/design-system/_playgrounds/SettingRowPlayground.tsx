'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { BellIcon, LockIcon, LogOutIcon, WalletIcon } from '@/components/ui/atoms/icons';
import { Switch } from '@/components/ui/atoms/Switch';
import { SettingRow } from '@/components/ui/molecules/SettingRow';
import { Example } from '../_components/Playground';

export function SettingRowPlayground() {
  const [notifications, setNotifications] = useState(true);

  return (
    <Example
      title="Variantes"
      code={`<SettingRow icon={WalletIcon} title="Moneda" value="COP · Peso" href="/ajustes/moneda" />
<SettingRow icon={LockIcon} title="Contraseña" description="…" control={<Button variant="secondary" size="sm">Cambiar</Button>} />
<SettingRow icon={LogOutIcon} title="Desactivar cuenta" onClick={abrir} danger />`}
    >
      <div className="flex w-full max-w-xl flex-col divide-y divide-border-subtle rounded-xl border border-border-subtle">
        <SettingRow
          icon={BellIcon}
          title="Avisos"
          description="Pagos próximos y obligaciones vencidas"
          control={
            <Switch checked={notifications} onChange={(event) => setNotifications(event.target.checked)}>
              <span className="sr-only">Avisos</span>
            </Switch>
          }
        />
        <SettingRow icon={WalletIcon} title="Moneda principal" value="COP · Peso" href="#" />
        <SettingRow
          icon={LockIcon}
          title="Contraseña"
          description="Cámbiala con tu contraseña actual"
          control={
            <Button variant="secondary" size="sm">
              Cambiar
            </Button>
          }
        />
        <SettingRow
          icon={LogOutIcon}
          title="Desactivar cuenta"
          description="Tu información se conserva"
          onClick={() => {}}
          danger
        />
      </div>
    </Example>
  );
}
