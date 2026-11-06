'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/atoms/Button';
import { ArrowRightIcon, CalendarIcon, UserIcon } from '@/components/ui/atoms/icons';
import { TextLink } from '@/components/ui/atoms/TextLink';
import { FormField } from '@/components/ui/molecules/FormField';
import { register } from '@/features/auth/api';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { AuthFormHeader } from '@/features/auth/components/AuthFormHeader';
import { PasswordRules } from '@/features/auth/components/PasswordRules';
import { useApiForm } from '@/features/auth/hooks/useApiForm';
import { useRedirectIfAuthenticated } from '@/features/auth/hooks/useRedirectIfAuthenticated';
import { savePendingEmail } from '@/features/auth/pendingEmail';

/* ══ REGISTERFORM · /registro · POST /auth/register ══ */

export function RegisterForm() {
  const router = useRouter();
  const { loading, fieldErrors, alert, wait, run } = useApiForm();
  // La contraseña se guarda en estado para marcar las reglas mientras se escribe
  const [password, setPassword] = useState('');
  useRedirectIfAuthenticated();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email'));

    await run(async () => {
      await register({
        name: String(form.get('name')),
        birth_date: String(form.get('birth_date')),
        email,
        password,
        password_confirmation: String(form.get('password_confirmation')),
      });
      // 201: no inicia sesión. Se va a «Revisa tu correo» con el correo guardado para mostrarlo y reenviar
      savePendingEmail(email);
      router.push('/verifica-tu-correo');
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthFormHeader />
      <AuthAlert alert={alert} wait={wait.seconds} />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          label="Nombre completo"
          name="name"
          autoComplete="name"
          icon={UserIcon}
          placeholder="Ej. Laura Gómez"
          required
          error={fieldErrors.name}
        />

        {/* Edad mínima de 18 años: la valida la API con la fecha de Bogotá. El input date envía AAAA-MM-DD */}
        <FormField
          label="Fecha de nacimiento"
          name="birth_date"
          type="date"
          autoComplete="bday"
          icon={CalendarIcon}
          required
          helper="Debes ser mayor de 18 años para crear una cuenta."
          error={fieldErrors.birth_date}
        />

        <FormField
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nombre@correo.com"
          required
          error={fieldErrors.email}
        />

        <div className="flex flex-col gap-2">
          <FormField
            label="Contraseña"
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
          label="Confirmar contraseña"
          name="password_confirmation"
          type="password"
          autoComplete="new-password"
          placeholder="Repite la contraseña"
          required
          error={fieldErrors.password_confirmation}
        />

        <Button type="submit" size="lg" iconRight={ArrowRightIcon} loading={loading} disabled={wait.running}>
          Crear cuenta
        </Button>
      </form>

      <p className="text-center text-body-sm text-content-secondary">
        Al crear tu cuenta aceptas los{' '}
        <TextLink href="/terminos" variant="inline">
          Términos
        </TextLink>{' '}
        y la{' '}
        <TextLink href="/privacidad" variant="inline">
          Política de privacidad
        </TextLink>
        .
      </p>
    </div>
  );
}
