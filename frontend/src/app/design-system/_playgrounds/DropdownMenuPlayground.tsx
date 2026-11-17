'use client';

import { CheckIcon, PencilIcon, TrashIcon } from '@/components/ui/atoms/icons';
import { DropdownMenu } from '@/components/ui/molecules/DropdownMenu';
import { useToast } from '@/components/ui/organisms/ToastProvider';
import { Example, Playground } from '../_components/Playground';

export function DropdownMenuPlayground() {
  const toast = useToast();

  return (
    <>
      <Playground
        component="DropdownMenu"
        importFrom="@/components/ui/molecules/DropdownMenu"
        controls={[
          { type: 'text', prop: 'label', default: 'Acciones de Mercado Éxito' },
          { type: 'select', prop: 'align', options: ['end', 'start'], default: 'end' },
        ]}
        render={(props) => (
          <DropdownMenu
            {...(props as React.ComponentProps<typeof DropdownMenu>)}
            items={[
              { label: 'Editar', icon: PencilIcon },
              { label: 'Marcar como pagado', icon: CheckIcon },
              'divider',
              { label: 'Anular', icon: TrashIcon, danger: true },
            ]}
          />
        )}
        codeProps={['items={items}']}
        previewClassName="min-h-72 items-start"
      />
      <Example
        title="Acciones de un movimiento (flechas, Inicio, Fin y Escape)"
        previewClassName="min-h-72 items-start"
        code={`<DropdownMenu
  label="Acciones de Mercado Éxito"
  items={[
    { label: 'Editar', icon: PencilIcon, href: '/movimientos/12/editar' },
    { label: 'Marcar como pagado', icon: CheckIcon, onSelect: marcar },
    'divider',
    { label: 'Anular', icon: TrashIcon, onSelect: abrirConfirmacion, danger: true },
  ]}
/>`}
      >
        <DropdownMenu
          label="Acciones de Mercado Éxito"
          items={[
            { label: 'Editar', icon: PencilIcon, onSelect: () => toast({ message: 'Editar' }) },
            {
              label: 'Marcar como pagado',
              icon: CheckIcon,
              onSelect: () => toast({ message: 'Marcado', tone: 'success' }),
            },
            { label: 'Duplicar', disabled: true },
            'divider',
            { label: 'Anular', icon: TrashIcon, danger: true, onSelect: () => toast({ message: 'Anular' }) },
          ]}
        />
      </Example>
    </>
  );
}
