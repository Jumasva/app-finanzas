'use client';

import { CheckIcon, PencilIcon, TrashIcon } from '@/components/ui/atoms/icons';
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/molecules/DropdownMenu';
import { Playground } from '../_components/Playground';

const items: DropdownMenuItem[] = [
  { label: 'Editar', icon: PencilIcon },
  { label: 'Marcar como pagado', icon: CheckIcon },
  { label: 'Duplicar', disabled: true },
  'divider',
  { label: 'Anular', icon: TrashIcon, danger: true },
];

export function DropdownMenuPlayground() {
  return (
    <Playground
      component="DropdownMenu"
      importFrom="@/components/ui/molecules/DropdownMenu"
      previewClassName="min-h-72 items-start"
      controls={[
        { type: 'text', prop: 'label', default: 'Acciones de Mercado Éxito' },
        { type: 'select', prop: 'align', options: ['end', 'start'], default: 'end' },
      ]}
      codeProps={[
        "items={[{ label: 'Editar', icon: PencilIcon, href: … }, 'divider', { label: 'Anular', danger: true, onSelect: … }]}",
      ]}
      render={(props) => <DropdownMenu {...(props as React.ComponentProps<typeof DropdownMenu>)} items={items} />}
    />
  );
}
