'use client';

import { CategoryIcon } from '@/components/ui/atoms/CategoryIcon';
import { CreditCardIcon, ReceiptIcon, WalletIcon } from '@/components/ui/atoms/icons';
import { OptionCard } from '@/components/ui/molecules/OptionCard';
import { Example } from '../_components/Playground';

export function OptionCardPlayground() {
  return (
    <Example
      title="Grupo de opciones (las flechas cambian de opción)"
      code={`<fieldset>
  <legend>Medio de pago</legend>
  <OptionCard name="payment_method" value="cash" title="Efectivo" description="…" icon={<CategoryIcon … />} defaultChecked />
  <OptionCard name="payment_method" value="debit" title="Débito" description="…" icon={<CategoryIcon … />} />
</fieldset>`}
    >
      <fieldset className="grid w-full gap-3 md:grid-cols-3">
        <legend className="mb-3 text-label">Medio de pago</legend>
        <OptionCard
          name="payment_method"
          value="cash"
          title="Efectivo"
          description="Sale del saldo disponible."
          icon={<CategoryIcon icon={WalletIcon} color="emerald" shape="square" />}
          defaultChecked
        />
        <OptionCard
          name="payment_method"
          value="debit"
          title="Débito"
          description="Sale de tu cuenta bancaria."
          icon={<CategoryIcon icon={ReceiptIcon} color="blue" shape="square" />}
        />
        <OptionCard
          name="payment_method"
          value="credit_card"
          title="Tarjeta de crédito"
          description="Disponible con el módulo de tarjetas."
          icon={<CategoryIcon icon={CreditCardIcon} color="indigo" shape="square" />}
          disabled
        />
      </fieldset>
    </Example>
  );
}
