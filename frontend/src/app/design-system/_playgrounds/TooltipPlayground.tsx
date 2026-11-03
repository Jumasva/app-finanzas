'use client';

import { Button } from '@/components/ui/atoms/Button';
import { InfoIcon } from '@/components/ui/atoms/icons';
import { Tooltip } from '@/components/ui/atoms/Tooltip';
import { Gallery, Playground, Row } from '../_components/Playground';

const placements = ['top', 'bottom', 'left', 'right'] as const;

// El trigger tiene que poder enfocarse: un botón de solo ícono con su nombre.
// Recibe props porque el Tooltip le agrega aria-describedby
function Trigger(props: { 'aria-describedby'?: string }) {
  return <Button variant="tertiary" size="sm" iconLeft={InfoIcon} aria-label="Más información" {...props} />;
}

export function TooltipPlayground() {
  return (
    <>
      <Playground
        component="Tooltip"
        importFrom="@/components/ui/atoms/Tooltip"
        extraImports={[
          "import { Button } from '@/components/ui/atoms/Button';",
          "import { InfoIcon } from '@/components/ui/atoms/icons';",
        ]}
        childrenCode='<Button variant="tertiary" size="sm" iconLeft={InfoIcon} aria-label="Más información" />'
        controls={[
          { type: 'text', prop: 'content', default: 'Ingresos menos gastos del mes' },
          { type: 'select', prop: 'placement', options: placements, default: 'top' },
        ]}
        render={(props) => (
          <Tooltip {...(props as Omit<React.ComponentProps<typeof Tooltip>, 'children'>)}>
            <Trigger />
          </Tooltip>
        )}
      />

      <Gallery title="Posiciones (pasa el mouse o enfoca con Tab)">
        <Row label="placement" className="gap-24 py-10">
          {placements.map((placement) => (
            <Tooltip key={placement} content="Ingresos menos gastos del mes" placement={placement}>
              <Trigger />
            </Tooltip>
          ))}
        </Row>
      </Gallery>
    </>
  );
}
