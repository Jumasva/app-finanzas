'use client';

import { UserIcon, WalletIcon } from '@/components/ui/atoms/icons';
import { SettingRow } from '@/components/ui/molecules/SettingRow';
import { SettingsGroup } from '@/components/ui/organisms/SettingsGroup';
import { Playground } from '../_components/Playground';

export function SettingsGroupPlayground() {
  return (
    <Playground
      component="SettingsGroup"
      importFrom="@/components/ui/organisms/SettingsGroup"
      previewClassName="items-start"
      controls={[
        { type: 'text', prop: 'title', default: 'Cuenta' },
        { type: 'text', prop: 'description', default: '' },
      ]}
      extraImports={["import { SettingRow } from '@/components/ui/molecules/SettingRow';"]}
      childrenCode={'<SettingRow icon={UserIcon} title="Mi perfil" href="/ajustes/perfil" />'}
      render={(props) => (
        <SettingsGroup {...(props as React.ComponentProps<typeof SettingsGroup>)} className="w-full max-w-xl">
          <SettingRow icon={UserIcon} title="Mi perfil" description="Nombre y correo" href="#" />
          <SettingRow icon={WalletIcon} title="Moneda principal" value="COP · Peso" href="#" />
        </SettingsGroup>
      )}
    />
  );
}
