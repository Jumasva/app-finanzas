'use client';

import { useState } from 'react';
import { CategoryIcon } from '@/components/ui/atoms/CategoryIcon';
import { CarIcon, FilmIcon, HeartIcon, HomeIcon, UtensilsIcon, WalletIcon } from '@/components/ui/atoms/icons';
import { Select } from '@/components/ui/molecules/Select';
import { Example, Gallery, Playground, Row } from '../_components/Playground';

// Ícono de categoría de 24: el CategoryIcon de 32 reducido, como en Figma
const leading = (icon: typeof CarIcon, color: React.ComponentProps<typeof CategoryIcon>['color']) => (
  <CategoryIcon icon={icon} color={color} size={32} className="size-6 [&>svg]:size-3.5" />
);

const categories = [
  { value: 'food', label: 'Alimentación', leading: leading(UtensilsIcon, 'amber') },
  { value: 'transport', label: 'Transporte', leading: leading(CarIcon, 'blue') },
  { value: 'home', label: 'Vivienda', leading: leading(HomeIcon, 'teal') },
  { value: 'health', label: 'Salud', leading: leading(HeartIcon, 'red') },
  { value: 'fun', label: 'Entretenimiento', leading: leading(FilmIcon, 'indigo') },
];

const currencies = [
  { value: 'COP', label: 'COP · Peso colombiano' },
  { value: 'USD', label: 'USD · Dólar estadounidense' },
  { value: 'EUR', label: 'EUR · Euro' },
];

function SelectDemo(props: Omit<React.ComponentProps<typeof Select>, 'options' | 'value' | 'onChange'>) {
  const [value, setValue] = useState<string | null>(null);
  return <Select {...props} options={categories} value={value} onChange={setValue} className="w-80" />;
}

export function SelectPlayground() {
  const [category, setCategory] = useState<string | null>('food');
  const [currency, setCurrency] = useState<string | null>(null);

  return (
    <>
      <Playground
        component="Select"
        importFrom="@/components/ui/molecules/Select"
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
        render={(props) => <SelectDemo {...(props as React.ComponentProps<typeof SelectDemo>)} />}
        codeProps={['options={options}', 'value={category}', 'onChange={setCategory}']}
        previewClassName="min-h-96 items-start"
      />
      <Example
        title="En uso (flechas, Enter, Escape y escribir una letra)"
        previewClassName="items-start"
        code={`const [category, setCategory] = useState<string | null>(null);

<Select
  label="Categoría"
  options={[
    { value: 'food', label: 'Alimentación', leading: <CategoryIcon … /> },
    { value: 'transport', label: 'Transporte', leading: <CategoryIcon … /> },
  ]}
  value={category}
  onChange={setCategory}
  name="category_id"
/>`}
      >
        <Select label="Categoría" options={categories} value={category} onChange={setCategory} className="w-80" />
        <Select
          label="Moneda principal"
          options={currencies}
          value={currency}
          onChange={setCurrency}
          placeholder="Selecciona una moneda"
          helper="No convierte los valores que ya registraste."
          size="md"
          className="w-80"
        />
      </Example>

      <Gallery>
        <Row label="placeholder" className="w-80">
          <Select
            options={categories}
            value={null}
            onChange={() => {}}
            icon={WalletIcon}
            placeholder="Selecciona una cuenta"
            className="w-full"
          />
        </Row>
        <Row label="error" className="w-80">
          <Select
            label="Categoría"
            options={categories}
            value={null}
            onChange={() => {}}
            error="Elige una categoría."
            className="w-full"
          />
        </Row>
        <Row label="disabled" className="w-80">
          <Select options={categories} value="food" onChange={() => {}} disabled className="w-full" />
        </Row>
      </Gallery>
    </>
  );
}
