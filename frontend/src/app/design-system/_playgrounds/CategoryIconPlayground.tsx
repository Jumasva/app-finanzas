'use client';

import { CategoryIcon } from '@/components/ui/atoms/CategoryIcon';
import {
  BriefcaseIcon,
  CarIcon,
  FilmIcon,
  GraduationCapIcon,
  HeartIcon,
  HomeIcon,
  ShoppingBagIcon,
  TargetIcon,
  UtensilsIcon,
  ZapIcon,
} from '@/components/ui/atoms/icons';
import { Gallery, Playground, Row } from '../_components/Playground';

const colors = ['amber', 'blue', 'green', 'teal', 'red', 'indigo', 'emerald', 'navy'] as const;

// Solo de ejemplo, como en Figma: la lista real de categorías irá en features/
const categories = [
  { name: 'Alimentación', icon: UtensilsIcon, color: 'amber' },
  { name: 'Transporte', icon: CarIcon, color: 'blue' },
  { name: 'Salario', icon: BriefcaseIcon, color: 'green' },
  { name: 'Vivienda', icon: HomeIcon, color: 'teal' },
  { name: 'Salud', icon: HeartIcon, color: 'red' },
  { name: 'Entretenimiento', icon: FilmIcon, color: 'indigo' },
  { name: 'Compras', icon: ShoppingBagIcon, color: 'emerald' },
  { name: 'Educación', icon: GraduationCapIcon, color: 'navy' },
  { name: 'Servicios', icon: ZapIcon, color: 'amber' },
  { name: 'Ahorro', icon: TargetIcon, color: 'emerald' },
] as const;

export function CategoryIconPlayground() {
  return (
    <>
      <Playground
        component="CategoryIcon"
        importFrom="@/components/ui/atoms/CategoryIcon"
        controls={[
          { type: 'icon', prop: 'icon', default: 'UtensilsIcon', required: true },
          { type: 'select', prop: 'color', options: colors, default: 'amber' },
          { type: 'select', prop: 'size', options: [32, 40], default: 40 },
          { type: 'select', prop: 'shape', options: ['circle', 'square'], default: 'circle' },
          { type: 'text', prop: 'label', default: '' },
        ]}
        render={(props) => <CategoryIcon {...(props as React.ComponentProps<typeof CategoryIcon>)} />}
      />

      <Gallery>
        <Row label="40 px" className="gap-6">
          {categories.map((category) => (
            <div key={category.name} className="flex w-24 flex-col items-center gap-1.5 text-center">
              <CategoryIcon icon={category.icon} color={category.color} />
              <span className="text-label-sm text-navy-900">{category.name}</span>
              <span className="text-body-sm text-neutral-500">{category.color}</span>
            </div>
          ))}
        </Row>
        <Row label="32 px">
          {categories.map((category) => (
            <CategoryIcon key={category.name} icon={category.icon} color={category.color} size={32} />
          ))}
        </Row>
        <Row label="square · 40 px">
          {categories.map((category) => (
            <CategoryIcon key={category.name} icon={category.icon} color={category.color} shape="square" />
          ))}
        </Row>
      </Gallery>
    </>
  );
}
