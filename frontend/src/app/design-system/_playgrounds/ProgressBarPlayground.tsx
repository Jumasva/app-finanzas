'use client';

import { ProgressBar } from '@/components/ui/atoms/ProgressBar';
import { formatMoney } from '@/lib/format';
import { Gallery, Playground, Row } from '../_components/Playground';

// Los cuatro casos de Figma, con su regla
const examples = [
  { label: 'brand', rule: 'Menos de 75 % del presupuesto', value: 620000, kind: 'budget' },
  { label: 'warning', rule: 'Entre 75 % y 99 %', value: 850000, kind: 'budget' },
  { label: 'danger', rule: '100 % o más: presupuesto excedido', value: 1120000, kind: 'budget' },
  { label: 'success', rule: 'Metas de ahorro cumplidas', value: 1000000, kind: 'goal' },
] as const;

const max = 1000000;

export function ProgressBarPlayground() {
  return (
    <>
      <Playground
        component="ProgressBar"
        importFrom="@/components/ui/atoms/ProgressBar"
        controls={[
          { type: 'number', prop: 'value', default: 620000 },
          { type: 'number', prop: 'max', default: 1000000 },
          { type: 'select', prop: 'kind', options: ['budget', 'goal'], default: 'budget' },
          // auto: sin tone, el color sale de la regla del porcentaje
          { type: 'select', prop: 'tone', options: ['auto', 'brand', 'warning', 'danger', 'success'], default: 'auto' },
          { type: 'select', prop: 'size', options: ['md', 'sm'], default: 'md' },
          { type: 'text', prop: 'label', default: '$620.000 de $1.000.000' },
        ]}
        render={({ tone, ...props }) => (
          <div className="w-full max-w-sm">
            <ProgressBar
              {...(props as React.ComponentProps<typeof ProgressBar>)}
              tone={tone === 'auto' ? undefined : (tone as React.ComponentProps<typeof ProgressBar>['tone'])}
            />
          </div>
        )}
      />

      <Gallery>
        {examples.map((example) => (
          <Row key={example.label} label={example.label} className="grid w-full gap-6 md:grid-cols-3 md:items-center">
            <ProgressBar
              value={example.value}
              max={max}
              kind={example.kind}
              label={example.kind === 'goal' ? 'Meta cumplida' : `${formatMoney(example.value)} de ${formatMoney(max)}`}
            />
            <ProgressBar value={example.value} max={max} kind={example.kind} size="sm" />
            <span className="text-body-sm text-neutral-600">{example.rule}</span>
          </Row>
        ))}
      </Gallery>
    </>
  );
}
