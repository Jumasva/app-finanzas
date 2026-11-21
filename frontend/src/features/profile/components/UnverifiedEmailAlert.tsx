'use client';

import { Alert } from '@/components/ui/atoms/Alert';
import { Button } from '@/components/ui/atoms/Button';
import { resendVerification } from '@/features/auth/api';
import { useApiForm } from '@/hooks/useApiForm';
import { formatWait } from '@/lib/format';

// Lo mismo que espera el backend entre envíos (contrato: reglas de forgot-password, 60 s)
const RESEND_WAIT = 60;

/* ══ UNVERIFIEDEMAILALERT · correo sin verificar en Configuración y Mi perfil ══ */
/* Pasa después de cambiar el correo (RF-VECOR-064): la sesión sigue, pero la contraseña, la moneda
   y desactivar la cuenta piden el correo verificado (403 email_not_verified). POST /auth/verification-email */

export function UnverifiedEmailAlert({ email }: { email: string }) {
  const { loading, alert, setAlert, wait, run } = useApiForm();

  async function resend() {
    await run(async () => {
      const { message } = await resendVerification(email);
      setAlert({ variant: 'success', message });
      wait.start(RESEND_WAIT);
    });
  }

  return (
    <Alert
      variant={alert?.variant === 'error' ? 'error' : 'warning'}
      title="Verifica tu correo"
      action={
        <Button
          variant="tertiary"
          size="sm"
          onClick={resend}
          loading={loading}
          disabled={wait.running}
          className="-ml-3"
        >
          {wait.running ? `Reenviar en ${formatWait(wait.seconds)}` : 'Reenviar el enlace'}
        </Button>
      }
    >
      <p>
        Te enviamos un enlace a <strong className="font-semibold">{email}</strong>. Hasta que lo abras no podrás cambiar
        tu contraseña ni tu moneda, ni desactivar la cuenta.
      </p>
      {alert && <p className="mt-1">{alert.message}</p>}
    </Alert>
  );
}
