'use client';

import { useState } from 'react';
import { CategoryIcon } from '@/components/ui/atoms/CategoryIcon';
import { CarIcon, FilmIcon, HeartIcon, HomeIcon, UtensilsIcon } from '@/components/ui/atoms/icons';
import { Select } from '@/components/ui/molecules/Select';
import { Gallery, Playground, Row } from '../_components/Playground';

// Ícono de categoría de 24: el CategoryIcon de 32 reducido, como en Figma
function leading(icon: typeof CarIcon, color: React.ComponentProps<typeof CategoryIcon>['color']) {
  return <CategoryIcon icon={icon} color={color} size={32} className="size-6 [&>svg]:size-3.5" />;
}

const categories = [
  { value: 'food', label: 'Alimentación', leading: leading(UtensilsIcon, 'amber') },
  { value: 'transport', label: 'Transporte', leading: leading(CarIcon, 'blue') },
  { value: 'home', label: 'Vivienda', leading: leading(HomeIcon, 'teal') },
  { value: 'health', label: 'Salud', leading: leading(HeartIcon, 'red') },
  { value: 'fun', label: 'Entretenimiento', leading: leading(FilmIcon, 'indigo') },
];

// La vista guarda la opción elegida: Select es controlado
function SelectDemo(props: Omit<React.ComponentProps<typeof Select>, 'options' | 'value' | 'onChange'>) {
  const [value, setValue] = useState<string | null>(null);
  return <Select {...props} options={categories} value={value} onChange={setValue} className="w-80" />;
}

export function SelectPlayground() {
  return (
    <>
      <Playground
        component="Select"
        importFrom="@/components/ui/molecules/Select"
        previewClassName="min-h-96 items-start"
        controls={[
          { type: 'text', prop: 'label', default: 'Categoría' },
          { type: 'text', prop: 'placeholder', default: 'Selecciona una categoría' },
          { type: 'text', prop: 'helper', default: '' },
          { type: 'text', prop: 'error', default: '' },
          { type: 'select', prop: 'size', options: ['lg', 'md'], default: 'lg' },
          { type: 'icon', prop: 'icon' },
          { type: 'boolean', prop: 'required' },
          { type: 'boolean', prop: 'optional' },
          { type: 'boolean', prop: 'disabled' },
        ]}
        codeProps={['options={options}', 'value={category}', 'onChange={setCategory}']}
        render={(props) => <SelectDemo {...(props as React.ComponentProps<typeof SelectDemo>)} />}
      />

      <Gallery>
        <Row label="con valor" className="w-80">
          <Select label="Categoría" options={categories} value="food" onChange={() => {}} className="w-full" />
        </Row>
      </Gallery>
    </>
  );
}
