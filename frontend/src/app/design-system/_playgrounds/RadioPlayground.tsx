'use client';

import { Radio } from '@/components/ui/atoms/Radio';
import { Gallery, Playground, Row } from '../_components/Playground';

export function RadioPlayground() {
  return (
    <>
      <Playground
        component="Radio"
        importFrom="@/components/ui/atoms/Radio"
        staticProps={{ name: 'periodo', value: 'mensual' }}
        controls={[
          { type: 'text', prop: 'children', default: 'Mensual' },
          { type: 'boolean', prop: 'defaultChecked' },
          { type: 'boolean', prop: 'disabled' },
        ]}
        render={(props) => <Radio {...(props as React.ComponentProps<typeof Radio>)} />}
      />

      <Gallery>
        <Row label="estados">
          <Radio name="estados-a">Mensual</Radio>
          <Radio name="estados-b" defaultChecked>
            Mensual
          </Radio>
          <Radio name="estados-c" disabled>
            Mensual
          </Radio>
          <Radio name="estados-d" defaultChecked disabled>
            Mensual
          </Radio>
        </Row>
        {/* Grupo: gap 4 px en vertical, 24 px en horizontal */}
        <Row label="grupo vertical" className="flex-col items-start gap-1">
          <Radio name="vertical" defaultChecked>
            Mensual
          </Radio>
          <Radio name="vertical">Quincenal</Radio>
          <Radio name="vertical">Semanal</Radio>
        </Row>
        <Row label="grupo horizontal" className="gap-6">
          <Radio name="horizontal" defaultChecked>
            Mensual
          </Radio>
          <Radio name="horizontal">Quincenal</Radio>
          <Radio name="horizontal">Semanal</Radio>
        </Row>
      </Gallery>
    </>
  );
}
