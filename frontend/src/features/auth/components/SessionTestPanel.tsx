'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { FormField } from '@/components/ui/molecules/FormField';
import { deactivateAccount, getMe, logout } from '@/features/auth/api';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { useApiForm } from '@/features/auth/hooks/useApiForm';
import { useSession } from '@/features/auth/session';

/* ══ SESSIONTESTPANEL · solo desarrollo: probar cerrar sesión, desactivar y la sesión vencida ══ */
/* Se quita cuando existan la topbar (cerrar sesión) y la pantalla de cuenta (desactivar) */

export function SessionTestPanel() {
  const user = useSession();
  const { loading, fieldErrors, alert, wait, run } = useApiForm();
  const [busy, setBusy] = useState<'logout' | 'timeout'>();

  // POST /auth/logout → 204 → al login
  async function handleLogout() {
    setBusy('logout');
    await run(async () => {
      await logout();
      window.location.replace('/ingresar');
    });
    setBusy(undefined);
  }

  // Simula la sesión vencida de verdad: cierra la sesión en el servidor sin avisarle a la app y
  // luego hace una petición normal. El 401 recorre el mismo camino que cuando pasan los 30 minutos
  async function handleTimeout() {
    setBusy('timeout');
    await run(async () => {
      await logout();
      await getMe();
    });
    setBusy(undefined);
  }

  // POST /account/deactivate con la contraseña → 204 → al login. 422 si la contraseña es incorrecta
  async function handleDeactivate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get('password'));

    await run(async () => {
      await deactivateAccount(password);
      window.location.replace('/ingresar');
    });
  }

  return (
    <section className="flex max-w-md flex-col gap-6 rounded-xl border border-dashed border-amber-500 p-6">
      <div className="flex flex-col gap-1">
        <span className="text-overline text-amber-800 uppercase">Solo desarrollo</span>
        <p className="text-body text-content-secondary">
          Sesión de <strong className="text-content-primary">{user?.name}</strong> ({user?.email})
        </p>
      </div>

      <AuthAlert alert={alert} wait={wait.seconds} />

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" loading={busy === 'logout'} disabled={Boolean(busy)} onClick={handleLogout}>
          Cerrar sesión
        </Button>
        <Button variant="tertiary" loading={busy === 'timeout'} disabled={Boolean(busy)} onClick={handleTimeout}>
          Simular sesión vencida
        </Button>
      </div>

      <form onSubmit={handleDeactivate} noValidate className="flex flex-col gap-3">
        <FormField
          label="Contraseña para desactivar la cuenta"
          name="password"
          type="password"
          autoComplete="current-password"
          helper="Después puedes reactivarla desde «¿Tu cuenta está inactiva? Reactívala»."
          error={fieldErrors.password}
        />
        <Button type="submit" variant="destructive" loading={loading && !busy} disabled={Boolean(busy)}>
          Desactivar cuenta
        </Button>
      </form>
    </section>
  );
}
