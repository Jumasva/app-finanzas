'use client';

import { useState } from 'react';
import { Button, ButtonLink } from '@/components/ui/atoms/Button';
import { ArrowRightIcon } from '@/components/ui/atoms/icons';
import { FormField } from '@/components/ui/molecules/FormField';
import { resetPassword } from '@/features/auth/api';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { AuthFormHeader } from '@/features/auth/components/AuthFormHeader';
import { ExpiredLinkActions } from '@/features/auth/components/ExpiredLinkActions';
import { PasswordRules } from '@/features/auth/components/PasswordRules';
import { useApiForm } from '@/features/auth/hooks/useApiForm';
import { useLinkParams } from '@/features/auth/hooks/useLinkParams';

/* ══ RESETPASSWORDFORM · /restablecer-contrasena?token&email · POST /auth/reset-password ══ */
/* initial (contraseña nueva) → done, o expired si el enlace no sirve */

export function ResetPasswordForm() {
  const params = useLinkParams();
  const { loading, fieldErrors, alert, wait, run } = useApiForm();
  const [status, setStatus] = useState<'initial' | 'done' | 'expired'>('initial');
  const [password, setPassword] = useState('');

  // Sin token o sin correo, el enlace no sirve
  const state = params ? status : 'expired';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!params) return;
    const form = new FormData(event.currentTarget);

    await run(
      async () => {
        await resetPassword({
          ...params,
          password,
          password_confirmation: String(form.get('password_confirmation')),
        });
        setStatus('done');
      },
      (error) => {
        // El 422 de un enlace vencido viene en errors.token (o en email si el enlace llegó roto).
        // Los 422 de la contraseña se quedan en el formulario
        if (error.status !== 422 || !(error.errors.token || error.errors.email)) return false;
        setStatus('expired');
        return true;
      },
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthFormHeader state={state} email={params?.email} />
      <AuthAlert alert={alert} wait={wait.seconds} />

      {state === 'initial' && (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <FormField
              label="Contraseña nueva"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo 10 caracteres"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={fieldErrors.password}
            />
            <PasswordRules password={password} />
          </div>

          <FormField
            label="Confirmar contraseña nueva"
            name="password_confirmation"
            type="password"
            autoComplete="new-password"
            placeholder="Repite la contraseña"
            required
            error={fieldErrors.password_confirmation}
          />

          <Button type="submit" size="lg" loading={loading} disabled={wait.running}>
            Guardar contraseña
          </Button>
        </form>
      )}

      {state === 'done' && (
        <ButtonLink href="/ingresar" size="lg" iconRight={ArrowRightIcon}>
          Iniciar sesión
        </ButtonLink>
      )}

      {state === 'expired' && <ExpiredLinkActions retryHref="/olvide-contrasena" />}
    </div>
  );
}
