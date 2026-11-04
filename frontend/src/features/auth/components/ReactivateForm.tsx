'use client';

import { reactivateAccount } from '@/features/auth/api';
import { ConfirmLinkForm } from '@/features/auth/components/ConfirmLinkForm';

/* ══ REACTIVATEFORM · /reactivar-cuenta?token&email · POST /account/reactivate ══ */

export function ReactivateForm() {
  return (
    <ConfirmLinkForm
      emailLabel="Cuenta"
      actionLabel="Reactivar mi cuenta"
      confirm={reactivateAccount}
      retryHref="/reactiva-tu-cuenta"
    />
  );
}
