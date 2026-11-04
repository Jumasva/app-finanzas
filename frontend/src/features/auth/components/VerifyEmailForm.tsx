'use client';

import { verifyEmail } from '@/features/auth/api';
import { ConfirmLinkForm } from '@/features/auth/components/ConfirmLinkForm';
import { savePendingEmail } from '@/features/auth/pendingEmail';

/* ══ VERIFYEMAILFORM · /verificar-correo?token&email · POST /auth/verify-email ══ */

export function VerifyEmailForm() {
  return (
    <ConfirmLinkForm
      emailLabel="Correo a verificar"
      actionLabel="Verificar mi correo"
      confirm={verifyEmail}
      retryHref="/verifica-tu-correo"
      // Si venció, «Revisa tu correo» ya tiene el correo para reenviar el enlace
      onExpired={savePendingEmail}
    />
  );
}
