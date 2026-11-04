'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Alert } from '@/components/ui/atoms/Alert';
import { Button } from '@/components/ui/atoms/Button';
import { ArrowRightIcon } from '@/components/ui/atoms/icons';
import { TextLink } from '@/components/ui/atoms/TextLink';
import { FormField } from '@/components/ui/molecules/FormField';
import { login } from '@/features/auth/api';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { AuthFormHeader } from '@/features/auth/components/AuthFormHeader';
import { useApiForm } from '@/features/auth/hooks/useApiForm';
import { useRedirectIfAuthenticated } from '@/features/auth/hooks/useRedirectIfAuthenticated';
import { savePendingEmail } from '@/features/auth/pendingEmail';

/* ══ LOGINFORM · /ingresar · POST /auth/login ══ */

export function LoginForm() {
  const router = useRouter();
  const { loading, fieldErrors, alert, wait, run } = useApiForm();
  // ?sesion=expirada lo pone api.ts cuando una petición de la app recibe 401 (estado «timeout» de Figma)
  const sessionExpired = useSearchParams().get('sesion') === 'expirada';
  useRedirectIfAuthenticated();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email'));

    await run(
      async () => {
        await login({ email, password: String(form.get('password')) });
        // Con sesión, a la app. replace: «atrás» no vuelve al login
        router.replace('/inicio');
      },
      (error) => {
        // 403 email_not_verified: contraseña correcta pero falta verificar. Se guarda el correo para reenviar el enlace
        if (error.code !== 'email_not_verified') return false;
        savePendingEmail(email);
        router.push('/verifica-tu-correo');
        return true;
      },
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthFormHeader />
      <AuthAlert alert={alert} wait={wait.seconds} />
      {sessionExpired && !alert && (
        <Alert variant="info">
          <p className="font-semibold">Tu sesión se cerró</p>
          <p>Por seguridad, vuelve a iniciar sesión para continuar.</p>
        </Alert>
      )}

      {/* noValidate: las validaciones y sus mensajes vienen de la API (422) */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nombre@correo.com"
          required
          error={fieldErrors.email}
        />

        <FormField
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Tu contraseña"
          required
          error={fieldErrors.password}
          labelAction={<TextLink href="/olvide-contrasena">¿La olvidaste?</TextLink>}
        />

        <Button type="submit" size="lg" iconRight={ArrowRightIcon} loading={loading} disabled={wait.running}>
          Iniciar sesión
        </Button>
      </form>

      <p className="text-center text-body text-content-secondary">
        ¿Tu cuenta está inactiva?{' '}
        <TextLink href="/reactiva-tu-cuenta" variant="inline">
          Reactívala
        </TextLink>
      </p>
    </div>
  );
}
