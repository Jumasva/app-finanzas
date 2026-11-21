'use client';

import { useState } from 'react';
import { FormField } from '@/components/ui/molecules/FormField';
import { ConfirmDialog } from '@/components/ui/organisms/ConfirmDialog';
import { deactivateAccount } from '@/features/auth/api';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { useApiForm } from '@/hooks/useApiForm';

type DeactivateAccountDialogProps = {
  open: boolean;
  onClose: () => void;
};

/* ══ DEACTIVATEACCOUNTDIALOG · Configuración › Desactivar cuenta · POST /account/deactivate (RF-GESCU) ══ */
/* Confirma con la contraseña (GESCU-045). 204: la cuenta queda inactiva, se cierran todas sus sesiones
   (GESCU-046) y se conserva la información (GESCU-047). Se reactiva pidiendo el enlace en /reactiva-tu-cuenta */

export function DeactivateAccountDialog({ open, onClose }: DeactivateAccountDialogProps) {
  const { loading, fieldErrors, alert, wait, run, reset } = useApiForm();
  const [password, setPassword] = useState('');

  function close() {
    onClose();
    reset();
    setPassword('');
  }

  async function confirm() {
    await run(async () => {
      await deactivateAccount(password);
      // replace: descarta la app en memoria y «atrás» no vuelve a una pantalla privada
      window.location.replace('/ingresar');
    });
  }

  return (
    <ConfirmDialog
      open={open}
      onClose={close}
      onConfirm={confirm}
      loading={loading}
      title="¿Desactivar tu cuenta?"
      description={
        <p>
          Cerraremos tu sesión en todos los dispositivos. Tu información se conserva: cuando quieras volver, pide un
          enlace de reactivación desde la pantalla de inicio de sesión.
        </p>
      }
      confirmLabel="Desactivar cuenta"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          confirm();
        }}
        noValidate
        className="flex flex-col gap-4"
      >
        <AuthAlert alert={alert} wait={wait.seconds} />
        <FormField
          label="Escribe tu contraseña para confirmar"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={fieldErrors.password}
        />
      </form>
    </ConfirmDialog>
  );
}
