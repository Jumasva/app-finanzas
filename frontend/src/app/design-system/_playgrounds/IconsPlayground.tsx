'use client';

import { useState } from 'react';
import type { IconSize } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';
import { getIcon, iconNames } from '../_components/Playground';

const sizes: IconSize[] = [16, 20, 24, 32];

// Colores de la ficha de Figma: el ícono hereda el color del texto
const colors = [
  { name: 'heredado', className: '' },
  { name: 'content-primary', className: 'text-navy-900' },
  { name: 'content-tertiary', className: 'text-neutral-500' },
  { name: 'brand-primary', className: 'text-emerald-600' },
  { name: 'danger', className: 'text-red-600' },
  { name: 'success', className: 'text-green-600' },
  { name: 'disabled', className: 'text-neutral-300' },
];

// Página propia: en vez de un átomo con props, la grilla de todos los íconos. Clic = copiar su código
export function IconsPlayground() {
  const [size, setSize] = useState<IconSize>(24);
  const [color, setColor] = useState(colors[0]);
  const [copied, setCopied] = useState<string>();

  async function copy(name: string) {
    const sizeProp = size === 24 ? '' : ` size={${size}}`;
    const classProp = color.className ? ` className="${color.className}"` : '';
    await navigator.clipboard.writeText(`<${name}${sizeProp}${classProp} />`);
    setCopied(name);
    setTimeout(() => setCopied(undefined), 1500);
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-8 rounded-xl border border-neutral-100 bg-neutral-50/50 p-5">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-body-sm text-neutral-600">size</span>
          <div className="flex gap-1.5">
            {sizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                onClick={() => setSize(option)}
                className={cn(
                  'rounded-sm border px-2.5 py-1 text-label-sm',
                  size === option ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-neutral-100 bg-white',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-body-sm text-neutral-600">color</span>
          <div className="flex flex-wrap gap-1.5">
            {colors.map((option) => (
              <button
                key={option.name}
                type="button"
                aria-pressed={color.name === option.name}
                onClick={() => setColor(option)}
                className={cn(
                  'rounded-sm border px-2.5 py-1 text-label-sm',
                  color.name === option.name
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-neutral-100 bg-white',
                )}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <pre className="overflow-x-auto rounded-xl bg-navy-950 p-5 font-mono text-body-sm text-navy-50">
        <code>{`import { HomeIcon } from '@/components/ui/atoms/icons';\n\n<HomeIcon size={${size}} />\n<HomeIcon label="Inicio" />  // solo si va sin texto al lado`}</code>
      </pre>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {iconNames.map((name) => {
          const Icon = getIcon(name)!;
          return (
            <button
              key={name}
              type="button"
              onClick={() => copy(name)}
              className="flex flex-col items-center gap-2 rounded-xl border border-neutral-100 bg-white p-4 text-navy-900 hover:border-emerald-600"
            >
              <Icon size={size} className={color.className} />
              <span className="text-body-sm text-neutral-600">{copied === name ? 'Copiado' : name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
