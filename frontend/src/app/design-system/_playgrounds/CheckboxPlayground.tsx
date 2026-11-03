'use client';

import { Checkbox } from '@/components/ui/atoms/Checkbox';
import { Gallery, Playground, Row } from '../_components/Playground';

export function CheckboxPlayground() {
  return (
    <>
      <Playground
        component="Checkbox"
        importFrom="@/components/ui/atoms/Checkbox"
        controls={[
          { type: 'text', prop: 'children', default: 'Recordarme' },
          { type: 'boolean', prop: 'defaultChecked' },
          { type: 'boolean', prop: 'indeterminate' },
          { type: 'boolean', prop: 'invalid' },
          { type: 'boolean', prop: 'disabled' },
        ]}
        render={(props) => <Checkbox {...(props as React.ComponentProps<typeof Checkbox>)} />}
      />

      <Gallery>
        <Row label="unchecked">
          <Checkbox>Recordarme</Checkbox>
          <Checkbox disabled>Recordarme</Checkbox>
          <Checkbox invalid>Acepto términos</Checkbox>
        </Row>
        <Row label="checked">
          <Checkbox defaultChecked>Recordarme</Checkbox>
          <Checkbox defaultChecked disabled>
            Recordarme
          </Checkbox>
        </Row>
        <Row label="indeterminate">
          <Checkbox indeterminate>Seleccionar todo</Checkbox>
          <Checkbox indeterminate disabled>
            Seleccionar todo
          </Checkbox>
        </Row>
      </Gallery>
    </>
  );
}
