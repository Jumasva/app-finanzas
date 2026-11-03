'use client';

import { Amount } from '@/components/ui/atoms/Amount';
import { Gallery, Playground, Row } from '../_components/Playground';

const types = ['income', 'expense', 'neutral'] as const;
const sizes = ['sm', 'base', 'lg', 'display'] as const;
const values = { income: 3800000, expense: 420000, neutral: 4250000 };

export function AmountPlayground() {
  return (
    <>
      <Playground
        component="Amount"
        importFrom="@/components/ui/atoms/Amount"
        controls={[
          { type: 'number', prop: 'value', default: 3800000 },
          { type: 'select', prop: 'type', options: types, default: 'neutral' },
          { type: 'select', prop: 'size', options: sizes, default: 'base' },
          { type: 'boolean', prop: 'arrow' },
        ]}
        render={(props) => <Amount {...(props as React.ComponentProps<typeof Amount>)} />}
      />

      <Gallery>
        {types.map((type) => (
          <Row key={type} label={type} className="gap-8">
            {sizes.map((size) => (
              <Amount key={size} value={values[type]} type={type} size={size} arrow />
            ))}
          </Row>
        ))}
      </Gallery>
    </>
  );
}
