'use client';

import { CategoryIcon } from '@/components/ui/atoms/CategoryIcon';
import { Divider } from '@/components/ui/atoms/Divider';
import { CarIcon, UtensilsIcon } from '@/components/ui/atoms/icons';
import { Gallery, Playground, Row } from '../_components/Playground';

type DividerProps = React.ComponentProps<typeof Divider>;

export function DividerPlayground() {
  return (
    <>
      <Playground
        component="Divider"
        importFrom="@/components/ui/atoms/Divider"
        controls={[
          { type: 'select', prop: 'orientation', options: ['horizontal', 'vertical'], default: 'horizontal' },
          { type: 'boolean', prop: 'inset' },
          { type: 'text', prop: 'label', default: '' },
        ]}
        // Con contenido alrededor, para que se vea lo que separa
        render={(props) =>
          props.orientation === 'vertical' ? (
            <div className="flex items-center gap-3 text-body text-neutral-600">
              Ingresos <Divider {...(props as DividerProps)} /> Gastos
            </div>
          ) : (
            <div className="flex w-full max-w-md flex-col gap-4 text-body text-neutral-600">
              <span>Bloque de arriba</span>
              <Divider {...(props as DividerProps)} />
              <span>Bloque de abajo</span>
            </div>
          )
        }
      />

      <Gallery>
        <Row label="horizontal" className="w-full max-w-md">
          <Divider />
        </Row>
        <Row label="con texto" className="w-full max-w-md">
          <Divider label="o continúa con" className="w-full" />
        </Row>
        <Row label="vertical">
          <div className="flex items-center gap-3 text-body text-neutral-600">
            Ingresos <Divider orientation="vertical" /> Gastos <Divider orientation="vertical" /> Ahorro
          </div>
        </Row>
        <Row label="inset">
          <div className="flex w-full max-w-md flex-col gap-3 text-body text-navy-900">
            <div className="flex items-center gap-3">
              <CategoryIcon icon={UtensilsIcon} color="amber" size={32} /> Mercado
            </div>
            <Divider inset />
            <div className="flex items-center gap-3">
              <CategoryIcon icon={CarIcon} color="blue" size={32} /> Gasolina
            </div>
          </div>
        </Row>
      </Gallery>
    </>
  );
}
