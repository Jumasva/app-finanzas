'use client';

import { useState } from 'react';
import { PeriodSelector } from '@/components/ui/molecules/PeriodSelector';
import { formatMonth, parseIsoDate, todayIso } from '@/lib/date';
import { Example, Gallery, Playground, Row } from '../_components/Playground';

export function PeriodSelectorPlayground() {
  const today = parseIsoDate(todayIso());
  const current = today.year * 12 + today.month - 1;
  const [index, setIndex] = useState(current);
  const year = Math.floor(index / 12);
  const month = (index % 12) + 1;

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
        render={(props) => (
          <PeriodSelector
            {...(props as React.ComponentProps<typeof PeriodSelector>)}
            onPrevious={() => {}}
            onNext={() => {}}
            onOpen={props.onOpen ? () => {} : undefined}
          />
        )}
        codeProps={['onPrevious={() => …}', 'onNext={() => …}']}
      />
      <Example
        title="En uso (no deja pasar del mes actual)"
        code={`<PeriodSelector
  label={formatMonth(year, month)}
  onPrevious={() => irAlMes(-1)}
  onNext={() => irAlMes(1)}
  nextDisabled={esElMesActual}
  onOpen={() => abrirCalendario()}
/>`}
      >
        <PeriodSelector
          label={formatMonth(year, month)}
          onPrevious={() => setIndex((value) => value - 1)}
          onNext={() => setIndex((value) => value + 1)}
          nextDisabled={index >= current}
        />
      </Example>

      <Gallery>
        <Row label="mes">
          <PeriodSelector label="Octubre 2026" onPrevious={() => {}} onNext={() => {}} onOpen={() => {}} />
        </Row>
        <Row label="último periodo">
          <PeriodSelector label="Noviembre 2026" onPrevious={() => {}} onNext={() => {}} nextDisabled />
        </Row>
        <Row label="rango">
          <PeriodSelector label="1 – 31 oct 2026" onPrevious={() => {}} onNext={() => {}} />
        </Row>
      </Gallery>
    </>
  );
}
