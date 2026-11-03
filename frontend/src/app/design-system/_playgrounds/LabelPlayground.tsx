'use client';

import { Input } from '@/components/ui/atoms/Input';
import { Label } from '@/components/ui/atoms/Label';
import { Gallery, Playground, Row } from '../_components/Playground';

export function LabelPlayground() {
  return (
    <>
      <Playground
        component="Label"
        importFrom="@/components/ui/atoms/Label"
        staticProps={{ htmlFor: 'email' }}
        controls={[
          { type: 'text', prop: 'children', default: 'Correo electrónico' },
          { type: 'boolean', prop: 'required' },
          { type: 'boolean', prop: 'optional' },
          { type: 'boolean', prop: 'disabled' },
        ]}
        render={(props) => <Label {...(props as React.ComponentProps<typeof Label>)} />}
      />

      <Gallery>
        <Row label="default">
          <Label>Correo electrónico</Label>
        </Row>
        <Row label="required">
          <Label required>Correo electrónico</Label>
        </Row>
        <Row label="optional">
          <Label optional>Notas</Label>
        </Row>
        <Row label="disabled">
          <Label disabled>Correo electrónico</Label>
        </Row>
        <Row label="con input">
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="demo-email" required>
              Correo electrónico
            </Label>
            <Input id="demo-email" type="email" placeholder="nombre@correo.com" required />
          </div>
        </Row>
      </Gallery>
    </>
  );
}
