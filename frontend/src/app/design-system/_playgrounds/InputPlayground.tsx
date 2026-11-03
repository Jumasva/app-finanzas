'use client';

import { Input } from '@/components/ui/atoms/Input';
import { Gallery, Playground, Row } from '../_components/Playground';

const types = ['text', 'email', 'password', 'money', 'search'] as const;

const placeholders: Record<(typeof types)[number], string> = {
  text: 'Ej. Arriendo',
  email: 'nombre@correo.com',
  password: '••••••••',
  money: '0',
  search: 'Buscar movimientos',
};

const filled: Record<(typeof types)[number], string> = {
  text: 'Arriendo apartamento',
  email: 'laura@correo.com',
  password: 'secreto123',
  money: '1.250.000',
  search: 'Mercado',
};

export function InputPlayground() {
  return (
    <>
      <Playground
        component="Input"
        importFrom="@/components/ui/atoms/Input"
        controls={[
          { type: 'select', prop: 'type', options: types, default: 'text' },
          { type: 'select', prop: 'size', options: ['md', 'lg'], default: 'md' },
          { type: 'text', prop: 'placeholder', default: 'Ej. Arriendo' },
          { type: 'icon', prop: 'icon' },
          { type: 'boolean', prop: 'invalid' },
          { type: 'boolean', prop: 'disabled' },
        ]}
        render={(props) => (
          <div className="w-full max-w-sm">
            <Input {...(props as React.ComponentProps<typeof Input>)} />
          </div>
        )}
      />

      <Gallery>
        {types.map((type) => (
          <Row key={type} label={type} className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Input type={type} placeholder={placeholders[type]} />
            <Input type={type} defaultValue={filled[type]} />
            <Input type={type} defaultValue={filled[type]} invalid />
            <Input type={type} placeholder={placeholders[type]} disabled />
          </Row>
        ))}
        <Row label="size md · lg" className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <Input placeholder="md · 40 px" />
          <Input placeholder="lg · 48 px" size="lg" />
        </Row>
      </Gallery>
    </>
  );
}
