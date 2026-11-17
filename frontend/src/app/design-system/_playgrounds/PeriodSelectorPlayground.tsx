'use client';

import { PeriodSelector } from '@/components/ui/molecules/PeriodSelector';
import { Gallery, Playground, Row } from '../_components/Playground';

export function PeriodSelectorPlayground() {
  return (
    <>
      <Playground
        component="PeriodSelector"
        importFrom="@/components/ui/molecules/PeriodSelector"
        controls={[
          { type: 'text', prop: 'label', default: 'Octubre 2026' },
          { type: 'boolean', prop: 'previousDisabled' },
          { type: 'boolean', prop: 'nextDisabled' },
          { type: 'boolean', prop: 'onOpen', code: 'onOpen={() => …}' },
        ]}
        codeProps={['onPrevious={() => …}', 'onNext={() => …}']}
        render={(props) => (
          <PeriodSelector
            {...(props as React.ComponentProps<typeof PeriodSelector>)}
            onPrevious={() => {}}
            onNext={() => {}}
            onOpen={props.onOpen ? () => {} : undefined}
          />
        )}
      />

      <Gallery>
        <Row label="último periodo">
          <PeriodSelector label="Noviembre 2026" onPrevious={() => {}} onNext={() => {}} nextDisabled />
        </Row>
        <Row label="rango">
          <PeriodSelector label="1 – 31 oct 2026" onPrevious={() => {}} onNext={() => {}} onOpen={() => {}} />
        </Row>
      </Gallery>
    </>
  );
}
