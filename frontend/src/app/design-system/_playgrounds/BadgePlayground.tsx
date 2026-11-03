'use client';

import { Badge } from '@/components/ui/atoms/Badge';
import { Gallery, Playground, Row } from '../_components/Playground';

const variants = ['soft', 'solid', 'outline'] as const;
const tones = ['success', 'warning', 'danger', 'info', 'neutral', 'complementary', 'brand'] as const;

export function BadgePlayground() {
  return (
    <>
      <Playground
        component="Badge"
        importFrom="@/components/ui/atoms/Badge"
        controls={[
          { type: 'select', prop: 'variant', options: variants, default: 'soft' },
          { type: 'select', prop: 'tone', options: tones, default: 'neutral' },
          { type: 'boolean', prop: 'dot' },
          { type: 'text', prop: 'children', default: 'Pagado' },
        ]}
        render={(props) => <Badge {...(props as React.ComponentProps<typeof Badge>)} />}
      />

      <Gallery>
        {variants.map((variant) => (
          <Row key={variant} label={variant}>
            {tones.map((tone) => (
              <Badge key={tone} variant={variant} tone={tone}>
                {tone}
              </Badge>
            ))}
          </Row>
        ))}
        {variants.map((variant) => (
          <Row key={`${variant}-dot`} label={`${variant} + dot`}>
            {tones.map((tone) => (
              <Badge key={tone} variant={variant} tone={tone} dot>
                {tone}
              </Badge>
            ))}
          </Row>
        ))}
      </Gallery>
    </>
  );
}
