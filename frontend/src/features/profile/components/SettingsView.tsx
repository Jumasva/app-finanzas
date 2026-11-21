'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/atoms/Badge';
import { Button } from '@/components/ui/atoms/Button';
import { LockIcon, LogOutIcon, MailIcon, UserIcon, WalletIcon, XIcon } from '@/components/ui/atoms/icons';
import { SettingRow } from '@/components/ui/molecules/SettingRow';
import { PageHeader } from '@/components/ui/organisms/PageHeader';
import { SettingsGroup } from '@/components/ui/organisms/SettingsGroup';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useSession } from '@/features/auth/session';
import { listCurrencies, type Currency } from '@/features/profile/api';
import { ChangePasswordDialog } from '@/features/profile/components/ChangePasswordDialog';
import { CurrencyDialog } from '@/features/profile/components/CurrencyDialog';
import { DeactivateAccountDialog } from '@/features/profile/components/DeactivateAccountDialog';
import { UnverifiedEmailAlert } from '@/features/profile/components/UnverifiedEmailAlert';

type OpenDialog = 'password' | 'currency' | 'deactivate' | null;

const LOCKED = 'Verifica tu correo para cambiarla';

/* ══ SETTINGSVIEW · /configuracion ══ */
/* Figma › Organisms › Settings: grupos (SettingsGroup) con filas (M17 Setting row). Figma aún no tiene
   la página armada; se construye con esos organismos. Cada cambio se hace en un diálogo sin salir de aquí,
   menos el perfil, que tiene su página (/configuracion/perfil) */

export function SettingsView() {
  const user = useSession();
  const { loggingOut, error: logoutError, logout } = useLogout();
  const [dialog, setDialog] = useState<OpenDialog>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const verified = Boolean(user?.email_verified_at);

  // GET /currencies exige el correo verificado; sin él, la fila muestra solo el código
  useEffect(() => {
    if (!verified) return;
    listCurrencies()
      .then(({ data }) => setCurrencies(data))
      .catch(() => setCurrencies([]));
  }, [verified]);

  // Solo el primer instante, mientras /auth/me responde (la pantalla está oculta)
  if (!user) return null;

  const currency = currencies.find((item) => item.code === user.currency_code);
  const close = () => setDialog(null);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <PageHeader title="Configuración" description="Tu perfil, tu seguridad y las preferencias de la cuenta." />

      <div className="flex w-full max-w-3xl flex-col gap-8">
        {!verified && <UnverifiedEmailAlert email={user.email} />}

        <SettingsGroup title="Cuenta">
          <SettingRow
            icon={UserIcon}
            title="Mi perfil"
            description={`${user.name} · ${user.email}`}
            href="/configuracion/perfil"
          />
          <SettingRow
            icon={WalletIcon}
            title="Moneda principal"
            description={verified ? 'En la que ves tus saldos e informes' : LOCKED}
            value={currency ? `${currency.code} · ${currency.name}` : user.currency_code}
            onClick={verified && currencies.length > 0 ? () => setDialog('currency') : undefined}
          />
        </SettingsGroup>

        <SettingsGroup title="Seguridad" description="Tu contraseña y el acceso a tu cuenta.">
          <SettingRow
            icon={LockIcon}
            title="Contraseña"
            description={verified ? 'Cámbiala con tu contraseña actual' : LOCKED}
            control={
              <Button variant="secondary" size="sm" onClick={() => setDialog('password')} disabled={!verified}>
                Cambiar
              </Button>
            }
          />
          <SettingRow
            icon={MailIcon}
            title="Correo"
            description={user.email}
            control={
              verified ? (
                <Badge tone="success" dot>
                  Verificado
                </Badge>
              ) : (
                <Badge tone="warning" dot>
                  Sin verificar
                </Badge>
              )
            }
          />
          <SettingRow
            icon={LogOutIcon}
            title="Cerrar sesión"
            description={logoutError ?? 'Sal de la cuenta en este dispositivo'}
            control={
              <Button variant="secondary" size="sm" onClick={logout} loading={loggingOut}>
                Salir
              </Button>
            }
          />
        </SettingsGroup>

        <SettingsGroup title="Zona de peligro">
          <SettingRow
            icon={XIcon}
            title="Desactivar cuenta"
            description={verified ? 'Tu información se conserva y puedes reactivarla' : LOCKED}
            onClick={verified ? () => setDialog('deactivate') : undefined}
            danger
          />
        </SettingsGroup>
      </div>

      <ChangePasswordDialog open={dialog === 'password'} onClose={close} />
      <CurrencyDialog
        open={dialog === 'currency'}
        onClose={close}
        current={user.currency_code}
        currencies={currencies}
      />
      <DeactivateAccountDialog open={dialog === 'deactivate'} onClose={close} />
    </div>
  );
}
