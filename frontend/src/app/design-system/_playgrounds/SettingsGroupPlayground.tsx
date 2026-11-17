'use client';

import { Button } from '@/components/ui/atoms/Button';
import { LockIcon, LogOutIcon, MailIcon, UserIcon, WalletIcon } from '@/components/ui/atoms/icons';
import { SettingRow } from '@/components/ui/molecules/SettingRow';
import { SettingsGroup } from '@/components/ui/organisms/SettingsGroup';
import { Example, Playground } from '../_components/Playground';

export function SettingsGroupPlayground() {
  return (
    <>
      <Playground
        component="SettingsGroup"
        importFrom="@/components/ui/organisms/SettingsGroup"
        controls={[
          { type: 'text', prop: 'title', default: 'Cuenta' },
          { type: 'text', prop: 'description', default: '' },
        ]}
        render={(props) => (
          <SettingsGroup {...(props as React.ComponentProps<typeof SettingsGroup>)} className="w-full max-w-xl">
            <SettingRow icon={UserIcon} title="Mi perfil" description="Nombre y correo" href="#" />
            <SettingRow icon={WalletIcon} title="Moneda principal" value="COP · Peso" href="#" />
          </SettingsGroup>
        )}
        previewClassName="items-start"
      />
      <Example
        title="Página de ajustes"
        code={`<SettingsGroup title="Cuenta">
  <SettingRow icon={UserIcon} title="Mi perfil" description="Nombre y correo" href="/ajustes/perfil" />
  <SettingRow icon={WalletIcon} title="Moneda principal" value="COP · Peso" href="/ajustes/moneda" />
</SettingsGroup>`}
        previewClassName="items-start"
      >
        <div className="flex w-full max-w-xl flex-col gap-8">
          <SettingsGroup title="Cuenta">
            <SettingRow icon={UserIcon} title="Mi perfil" description="Nombre y correo" href="#" />
            <SettingRow icon={WalletIcon} title="Moneda principal" value="COP · Peso" href="#" />
          </SettingsGroup>
          <SettingsGroup title="Seguridad" description="Tu contraseña y el acceso a tu cuenta.">
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
            <SettingRow icon={MailIcon} title="Correo verificado" value="laura@correo.com" />
            <SettingRow
              icon={LogOutIcon}
              title="Desactivar cuenta"
              description="Tu información se conserva"
              onClick={() => {}}
              danger
            />
          </SettingsGroup>
        </div>
      </Example>
    </>
  );
}
