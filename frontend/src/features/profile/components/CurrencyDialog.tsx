'use client';

import { useId, useState } from 'react';
import { Alert } from '@/components/ui/atoms/Alert';
import { Button } from '@/components/ui/atoms/Button';
import { OptionCard } from '@/components/ui/molecules/OptionCard';
import { Dialog } from '@/components/ui/organisms/Dialog';
import { useToast } from '@/components/ui/organisms/ToastProvider';
import type { User } from '@/features/auth/api';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { useUpdateSession } from '@/features/auth/session';
import { updatePreferences, type Currency } from '@/features/profile/api';
import { useApiForm } from '@/hooks/useApiForm';

type CurrencyDialogProps = {
  open: boolean;
  onClose: () => void;
  current: User['currency_code'];
  // GET /currencies, que ya pidió la página de Configuración
  currencies: Currency[];
};

/* ══ CURRENCYDIALOG · Configuración › Moneda principal · PATCH /profile/preferences (RF-COPRE) ══ */
/* Son tres monedas con nombre: Option card (M16) y no un Select. La advertencia de COPRE-041
   se muestra antes de guardar; la API no convierte ningún monto (COPRE-042) */

export function CurrencyDialog({ open, onClose, current, currencies }: CurrencyDialogProps) {
  const formId = useId();
  const toast = useToast();
  const updateSession = useUpdateSession();
  const { loading, fieldErrors, alert, wait, run, reset } = useApiForm();
  const [selected, setSelected] = useState(current);

  function close() {
    onClose();
    reset();
    setSelected(current);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selected === current) return close();

    await run(async () => {
      const { data } = await updatePreferences(selected);
      updateSession(data);
      onClose();
      reset();
      toast({ message: 'Cambiamos tu moneda principal.', tone: 'success' });
    });
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      busy={loading}
      title="Moneda principal"
      description="La moneda en la que ves tus saldos, movimientos e informes."
      footer={
        <>
          <Button variant="secondary" onClick={close} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" form={formId} loading={loading} disabled={wait.running}>
            Guardar moneda
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <AuthAlert alert={alert} wait={wait.seconds} />

        <fieldset className="flex flex-col gap-3">
          <legend className="sr-only">Elige tu moneda principal</legend>
          {currencies.map((currency) => (
            <OptionCard
              key={currency.code}
              name="currency_code"
              value={currency.code}
              title={currency.name}
              description={currency.code}
              checked={selected === currency.code}
              onChange={() => setSelected(currency.code)}
            />
          ))}
        </fieldset>
        {fieldErrors.currency_code && <p className="text-body-sm text-danger-dark">{fieldErrors.currency_code}</p>}

        {/* COPRE-041: aviso antes de enviar */}
        <Alert variant="warning">
          Solo cambia el símbolo con que se muestran los valores. No convertimos ningún monto: lo que registraste queda
          con las mismas cifras.
        </Alert>
      </form>
    </Dialog>
  );
}
