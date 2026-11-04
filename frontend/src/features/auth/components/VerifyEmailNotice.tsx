'use client';

import { useState } from 'react';
import { Button, ButtonLink } from '@/components/ui/atoms/Button';
import { ArrowRightIcon, RefreshIcon } from '@/components/ui/atoms/icons';
import { TextLink } from '@/components/ui/atoms/TextLink';
import { FormField } from '@/components/ui/molecules/FormField';
import { resendVerification } from '@/features/auth/api';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { AuthChecklist } from '@/features/auth/components/AuthChecklist';
import { AuthFormHeader } from '@/features/auth/components/AuthFormHeader';
import { EmailBox } from '@/features/auth/components/EmailBox';
import { useApiForm } from '@/features/auth/hooks/useApiForm';
import { usePendingEmail } from '@/features/auth/pendingEmail';
import { formatWait } from '@/lib/format';

// Después de reenviar, el botón espera lo mismo que pide el backend entre envíos (contrato: 60 s)
const RESEND_WAIT = 60;

/* ══ VERIFYEMAILNOTICE · /verifica-tu-correo · POST /auth/verification-email ══ */
/* Llega desde el registro o desde un login con el correo sin verificar */

export function VerifyEmailNotice() {
  const pendingEmail = usePendingEmail();
  const { loading, fieldErrors, alert, setAlert, wait, run } = useApiForm();
  const [resent, setResent] = useState(false);

  async function resend(email: string) {
    await run(async () => {
      const { message } = await resendVerification(email);
      setResent(true);
      setAlert({ variant: 'success', message });
      wait.start(RESEND_WAIT);
    });
  }

  // Sin correo guardado (se abrió en otra pestaña o se recargó en privado), se pide para poder reenviar
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = pendingEmail ?? String(new FormData(event.currentTarget).get('email'));
    await resend(email);
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthFormHeader />
      <AuthAlert alert={alert} wait={wait.seconds} />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {pendingEmail ? (
          <EmailBox
            label="Enviamos el enlace a"
            email={pendingEmail}
            action={<TextLink href="/registro">Cambiar</TextLink>}
          />
        ) : (
          <FormField
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.com"
            helper="Escribe tu correo para enviarte el enlace de nuevo."
            error={fieldErrors.email}
          />
        )}

        {!resent && (
          <AuthChecklist
            items={[
              'El enlace vale 24 horas y se puede usar una sola vez.',
              'Si no lo ves, revisa la carpeta de spam o promociones.',
            ]}
          />
        )}

        <div className="flex flex-col gap-3">
          <ButtonLink href="/ingresar" size="lg" iconRight={ArrowRightIcon}>
            Ya lo verifiqué: iniciar sesión
          </ButtonLink>
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            iconLeft={wait.running ? undefined : RefreshIcon}
            loading={loading}
            disabled={wait.running}
          >
            {wait.running ? `Reenviar el enlace en ${formatWait(wait.seconds)}` : 'Reenviar el enlace'}
          </Button>
        </div>
      </form>
    </div>
  );
}
