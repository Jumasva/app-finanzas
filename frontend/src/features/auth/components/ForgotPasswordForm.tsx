'use client';

import { TextLink } from '@/components/ui/atoms/TextLink';
import { forgotPassword } from '@/features/auth/api';
import { RequestLinkForm } from '@/features/auth/components/RequestLinkForm';

/* ══ FORGOTPASSWORDFORM · /olvide-contrasena · POST /auth/forgot-password ══ */

export function ForgotPasswordForm() {
  return (
    <RequestLinkForm
      fieldLabel="Correo electrónico"
      send={forgotPassword}
      sentChecklist={[
        'El enlace vale 60 minutos y se puede usar una sola vez.',
        'Si no lo ves, revisa la carpeta de spam.',
      ]}
      sentBackButton
      footer={
        <p className="text-center text-body text-content-secondary">
          ¿La recordaste?{' '}
          <TextLink href="/ingresar" variant="inline">
            Inicia sesión
          </TextLink>
        </p>
      }
    />
  );
}
