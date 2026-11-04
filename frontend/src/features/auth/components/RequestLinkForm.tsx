'use client';

import { useState } from 'react';
import { Button, ButtonLink } from '@/components/ui/atoms/Button';
import { ArrowRightIcon } from '@/components/ui/atoms/icons';
import { FormField } from '@/components/ui/molecules/FormField';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { AuthChecklist } from '@/features/auth/components/AuthChecklist';
import { AuthFormHeader } from '@/features/auth/components/AuthFormHeader';
import { useApiForm } from '@/features/auth/hooks/useApiForm';
import { formatWait } from '@/lib/format';

// Entre un envío y otro: el backend responde 429 si se repite antes de 60 segundos
const RESEND_WAIT = 60;

type RequestLinkFormProps = {
  // Label del campo: «Correo electrónico», «Correo de la cuenta inactiva»
  fieldLabel: string;
  // Llamada a la API. Siempre responde 200, exista o no la cuenta (no revela qué correos existen)
  send: (email: string) => Promise<unknown>;
  // Lista bajo «Te enviamos un enlace» (vacía si la descripción ya lo dice todo)
  sentChecklist?: string[];
  // Botón «Volver a iniciar sesión» en el estado enviado
  sentBackButton?: boolean;
  // Lo que va debajo del formulario: «¿La recordaste? Inicia sesión»
  footer?: React.ReactNode;
};

/* ══ REQUESTLINKFORM · pantallas que piden un enlace por correo ══ */
/* /olvide-contrasena y /reactiva-tu-cuenta: initial (pedir) → sent (te enviamos un enlace) */

export function RequestLinkForm({
  fieldLabel,
  send,
  sentChecklist,
  sentBackButton = false,
  footer,
}: RequestLinkFormProps) {
  const { loading, fieldErrors, alert, wait, run } = useApiForm();
  // El correo enviado: con él se muestra la descripción y se reenvía
  const [sentTo, setSentTo] = useState<string>();

  async function request(email: string) {
    await run(async () => {
      await send(email);
      setSentTo(email);
      wait.start(RESEND_WAIT);
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await request(String(new FormData(event.currentTarget).get('email')));
  }

  if (sentTo) {
    return (
      <div className="flex flex-col gap-6">
        <AuthFormHeader state="sent" email={sentTo} />
        <AuthAlert alert={alert} wait={wait.seconds} />
        {sentChecklist && <AuthChecklist items={sentChecklist} />}

        <div className="flex flex-col gap-3">
          {sentBackButton && (
            <ButtonLink href="/ingresar" size="lg">
              Volver a iniciar sesión
            </ButtonLink>
          )}
          <Button
            variant="secondary"
            size="lg"
            loading={loading}
            disabled={wait.running}
            onClick={() => request(sentTo)}
          >
            {wait.running ? `Enviar de nuevo en ${formatWait(wait.seconds)}` : 'Enviar de nuevo'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthFormHeader />
      <AuthAlert alert={alert} wait={wait.seconds} />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          label={fieldLabel}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nombre@correo.com"
          error={fieldErrors.email}
        />
        <Button type="submit" size="lg" iconRight={ArrowRightIcon} loading={loading} disabled={wait.running}>
          Enviar enlace
        </Button>
      </form>

      {footer}
    </div>
  );
}
