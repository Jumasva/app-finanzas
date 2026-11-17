'use client';

import { FormField } from '@/components/ui/molecules/FormField';
import { Gallery, Playground, Row } from '../_components/Playground';

export function FormFieldPlayground() {
  return (
    <>
      <Playground
        component="FormField"
        importFrom="@/components/ui/molecules/FormField"
        controls={[
          { type: 'text', prop: 'label', default: 'Correo electrónico' },
          { type: 'select', prop: 'type', options: ['email', 'text', 'password', 'money'], default: 'email' },
          { type: 'text', prop: 'placeholder', default: 'nombre@correo.com' },
          { type: 'text', prop: 'helper', default: '' },
          { type: 'text', prop: 'error', default: '' },
          { type: 'boolean', prop: 'required' },
          { type: 'boolean', prop: 'optional' },
          { type: 'boolean', prop: 'disabled' },
        ]}
        render={(props) => (
          <FormField {...(props as React.ComponentProps<typeof FormField>)} className="w-full max-w-sm" />
        )}
      />

      <Gallery>
        <Row label="estados" className="grid w-full gap-6 md:grid-cols-3">
          <FormField
            label="Correo electrónico"
            type="email"
            placeholder="nombre@correo.com"
            helper="Te enviaremos un enlace para verificarlo."
          />
          <FormField
            label="Correo electrónico"
            type="email"
            defaultValue="laura@correo"
            error="Escribe un correo válido."
          />
          <FormField label="Correo electrónico" type="email" defaultValue="laura@correo.com" disabled />
        </Row>
      </Gallery>
    </>
  );
}
