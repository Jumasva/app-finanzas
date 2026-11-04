'use client';

import { requestReactivation } from '@/features/auth/api';
import { RequestLinkForm } from '@/features/auth/components/RequestLinkForm';

/* ══ REACTIVATIONREQUESTFORM · /reactiva-tu-cuenta · POST /account/reactivation-request ══ */
/* En el estado enviado, Figma solo muestra la descripción y «Enviar de nuevo» */

export function ReactivationRequestForm() {
  return <RequestLinkForm fieldLabel="Correo de la cuenta inactiva" send={requestReactivation} />;
}
