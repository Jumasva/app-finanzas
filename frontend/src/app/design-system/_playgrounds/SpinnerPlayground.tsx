'use client';

import { Spinner } from '@/components/ui/atoms/Spinner';
import { Gallery, Playground, Row } from '../_components/Playground';

const sizes = [16, 20, 24, 32] as const;
const uses = { 16: 'Botón small', 20: 'Botón, input', 24: 'Tarjeta', 32: 'Pantalla' };

export function SpinnerPlayground() {
  return (
    <>
      <Playground
        component="Spinner"
        importFrom="@/components/ui/atoms/Spinner"
        controls={[
          { type: 'select', prop: 'size', options: sizes, default: 20 },
          { type: 'select', prop: 'color', options: ['brand', 'on-primary', 'neutral'], default: 'brand' },
          { type: 'text', prop: 'label', default: '' },
        ]}
        // on-primary se ve sobre el verde de un botón primary
        render={(props) => (
          <div className={props.color === 'on-primary' ? 'rounded-md bg-emerald-600 p-3' : ''}>
            <Spinner {...(props as React.ComponentProps<typeof Spinner>)} />
          </div>
        )}
      />

      <Gallery>
        <Row label="size" className="gap-10">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Spinner size={size} />
              <span className="text-label-sm text-navy-900">{size} px</span>
              <span className="text-body-sm text-neutral-500">{uses[size]}</span>
            </div>
          ))}
        </Row>
        <Row label="color" className="gap-10">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-md bg-emerald-600 p-3">
              <Spinner color="on-primary" />
            </div>
            <span className="text-body-sm text-neutral-500">on-primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner color="neutral" />
            <span className="text-body-sm text-neutral-500">neutral</span>
          </div>
        </Row>
      </Gallery>
    </>
  );
}
