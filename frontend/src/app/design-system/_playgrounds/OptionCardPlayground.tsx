'use client';

import { CategoryIcon } from '@/components/ui/atoms/CategoryIcon';
import { CreditCardIcon, ReceiptIcon, WalletIcon } from '@/components/ui/atoms/icons';
import { OptionCard } from '@/components/ui/molecules/OptionCard';
import { Gallery, Playground } from '../_components/Playground';

export function OptionCardPlayground() {
  return (
    <>
      <Playground
        component="OptionCard"
        importFrom="@/components/ui/molecules/OptionCard"
        controls={[
          { type: 'text', prop: 'title', default: 'Efectivo' },
          { type: 'text', prop: 'description', default: 'Sale del saldo disponible.' },
          { type: 'boolean', prop: 'defaultChecked', default: true },
          { type: 'boolean', prop: 'disabled' },
        ]}
        codeProps={['name="payment_method"', 'value="cash"', 'icon={<CategoryIcon … />}']}
        render={(props) => (
          <OptionCard
            {...(props as React.ComponentProps<typeof OptionCard>)}
            name="demo"
            icon={<CategoryIcon icon={WalletIcon} color="emerald" shape="square" />}
            className="w-80"
          />
        )}
      />

      <Gallery title="Grupo: las flechas cambian de opción">
        <fieldset className="grid w-full gap-3 py-5 md:grid-cols-3">
          <legend className="sr-only">Medio de pago</legend>
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
      </Gallery>
    </>
  );
}
