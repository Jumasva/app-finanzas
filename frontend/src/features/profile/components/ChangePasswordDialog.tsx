'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { FormField } from '@/components/ui/molecules/FormField';
import { Dialog } from '@/components/ui/organisms/Dialog';
import { useToast } from '@/components/ui/organisms/ToastProvider';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { PasswordRules } from '@/features/auth/components/PasswordRules';
import { updatePassword } from '@/features/profile/api';
import { useApiForm } from '@/hooks/useApiForm';

type ChangePasswordDialogProps = {
  open: boolean;
  onClose: () => void;
};

/* ══ CHANGEPASSWORDDIALOG · Configuración › Contraseña · PATCH /profile/password (RF-CACON) ══ */
/* Pide la actual (CACON-035) y la nueva con su confirmación. Al guardar se cierran las demás sesiones
   y se mantiene esta: el toast lo cuenta con el mensaje de la API */

export function ChangePasswordDialog({ open, onClose }: ChangePasswordDialogProps) {
  const formId = useId();
  const toast = useToast();
  const { loading, fieldErrors, alert, wait, run, reset } = useApiForm();
  const [password, setPassword] = useState('');
  // Cambia en cada apertura: el formulario se monta de nuevo y los campos quedan vacíos
  const [formKey, setFormKey] = useState(0);

  function close() {
    onClose();
    reset();
    setPassword('');
    setFormKey((key) => key + 1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    await run(async () => {
      const { message } = await updatePassword({
        current_password: String(form.get('current_password')),
        password,
        password_confirmation: String(form.get('password_confirmation')),
      });
      close();
      toast({ message, tone: 'success' });
    });
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      busy={loading}
      title="Cambiar contraseña"
      description="Cerraremos tu sesión en los demás dispositivos. Aquí seguirás conectado."
      footer={
        <>
          <Button variant="secondary" onClick={close} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" form={formId} loading={loading} disabled={wait.running}>
            Guardar contraseña
          </Button>
        </>
      }
    >
      <form key={formKey} id={formId} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <AuthAlert alert={alert} wait={wait.seconds} />

        <FormField
          label="Contraseña actual"
          name="current_password"
          type="password"
          autoComplete="current-password"
          required
          error={fieldErrors.current_password}
        />

        <div className="flex flex-col gap-2">
          <FormField
            label="Contraseña nueva"
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
          label="Confirmar contraseña nueva"
          name="password_confirmation"
          type="password"
          autoComplete="new-password"
          placeholder="Repite la contraseña"
          required
          error={fieldErrors.password_confirmation}
        />
      </form>
    </Dialog>
  );
}
