'use client';

import { useState } from 'react';
import { Button, ButtonLink } from '@/components/ui/atoms/Button';
import { ArrowRightIcon, CheckIcon } from '@/components/ui/atoms/icons';
import type { LinkParams } from '@/features/auth/api';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { AuthFormHeader } from '@/features/auth/components/AuthFormHeader';
import { EmailBox } from '@/features/auth/components/EmailBox';
import { ExpiredLinkActions } from '@/features/auth/components/ExpiredLinkActions';
import { useApiForm } from '@/features/auth/hooks/useApiForm';
import { useLinkParams } from '@/features/auth/hooks/useLinkParams';

type ConfirmLinkFormProps = {
  // Texto sobre el correo: «Correo a verificar», «Cuenta»
  emailLabel: string;
  // Texto del botón: «Verificar mi correo», «Reactivar mi cuenta»
  actionLabel: string;
  // Llamada a la API con el token y el correo del enlace
  confirm: (params: LinkParams) => Promise<unknown>;
  // Dónde se pide un enlace nuevo si este venció
  retryHref: string;
  // Antes de ir a pedir otro enlace (por ejemplo, guardar el correo)
  onExpired?: (email: string) => void;
};

/* ══ CONFIRMLINKFORM · pantallas que abren el enlace del correo y solo confirman con un botón ══ */
/* /verificar-correo y /reactivar-cuenta: initial → done, o expired si el enlace no sirve */

export function ConfirmLinkForm({ emailLabel, actionLabel, confirm, retryHref, onExpired }: ConfirmLinkFormProps) {
  const params = useLinkParams();
  const { loading, alert, wait, run } = useApiForm();
  const [status, setStatus] = useState<'initial' | 'done' | 'expired'>('initial');

  // Un enlace sin token o sin correo no sirve: se muestra como vencido sin llamar a la API
  const state = params ? status : 'expired';

  async function handleConfirm() {
    if (!params) return;

    await run(
      async () => {
        await confirm(params);
        setStatus('done');
      },
      (error) => {
        // 422 con errors.token: el enlace venció, ya se usó o ya no aplica
        if (error.status !== 422) return false;
        onExpired?.(params.email);
        setStatus('expired');
        return true;
      },
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthFormHeader state={state} />
      <AuthAlert alert={alert} wait={wait.seconds} />

      {state === 'initial' && params && (
        <>
          <EmailBox label={emailLabel} email={params.email} />
          <Button size="lg" iconRight={CheckIcon} loading={loading} disabled={wait.running} onClick={handleConfirm}>
            {actionLabel}
          </Button>
        </>
      )}

      {state === 'done' && (
        <ButtonLink href="/ingresar" size="lg" iconRight={ArrowRightIcon}>
          Iniciar sesión
        </ButtonLink>
      )}

      {state === 'expired' && <ExpiredLinkActions retryHref={retryHref} />}
    </div>
  );
}
