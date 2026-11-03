'use client';

import { useState } from 'react';
import * as Icons from '@/components/ui/atoms/icons';
import type { IconComponent } from '@/components/ui/atoms/icons';
import { Switch } from '@/components/ui/atoms/Switch';
import { cn } from '@/lib/cn';

/* ══ TIPOS ══ */

// Cada control es una prop del átomo que se puede cambiar desde la página
export type Control =
  // Opciones fijas: variant, tone, size…
  | { type: 'select'; prop: string; options: readonly (string | number)[]; default: string | number }
  // Encendido/apagado. `code` reemplaza lo que se escribe en el código (ej. onRemove={() => …})
  | { type: 'boolean'; prop: string; default?: boolean; code?: string }
  // Texto libre. La prop `children` se escribe entre las etiquetas
  | { type: 'text'; prop: string; default: string }
  // Número escrito a mano: value={3800000}
  | { type: 'number'; prop: string; default: number }
  // Un ícono del set. required: no se puede dejar vacío
  | { type: 'icon'; prop: string; default?: string; required?: boolean };

export type Values = Record<string, string | number | boolean | undefined>;

// Props que recibe la vista: los íconos ya convertidos en componente
export type PreviewProps = Record<string, unknown>;

type PlaygroundProps = {
  component: string;
  importFrom: string;
  controls: Control[];
  render: (props: PreviewProps) => React.ReactNode;
  // Props que siempre van, no se cambian: href="#", name="periodo"…
  staticProps?: Record<string, string>;
  // JSX que va dentro de la etiqueta cuando no es un texto (Tooltip)
  childrenCode?: string;
  extraImports?: string[];
  previewClassName?: string;
};

/* ══ ÍCONOS ══ */

const iconMap = Icons as unknown as Record<string, IconComponent>;
export const iconNames = Object.keys(iconMap)
  .filter((name) => name.endsWith('Icon'))
  .sort();

export function getIcon(name?: string) {
  return name ? iconMap[name] : undefined;
}

/* ══ CÓDIGO ══ */

function propCode(control: Control, value: Values[string]) {
  switch (control.type) {
    case 'select':
      if (value === control.default) return null;
      return typeof value === 'number' ? `${control.prop}={${value}}` : `${control.prop}="${value}"`;
    case 'boolean':
      if (!value) return null;
      return control.code ?? control.prop;
    case 'text':
      return control.prop === 'children' || !value ? null : `${control.prop}="${value}"`;
    case 'number':
      return `${control.prop}={${value}}`;
    case 'icon':
      return value ? `${control.prop}={${value}}` : null;
  }
}

function buildCode({
  component,
  importFrom,
  controls,
  values,
  staticProps,
  childrenCode,
  extraImports = [],
}: Omit<PlaygroundProps, 'render'> & { values: Values }) {
  const usedIcons = controls.filter((c) => c.type === 'icon' && values[c.prop]).map((c) => values[c.prop]);

  const imports = [
    `import { ${component} } from '${importFrom}';`,
    ...extraImports,
    ...(usedIcons.length
      ? [`import { ${[...new Set(usedIcons)].join(', ')} } from '@/components/ui/atoms/icons';`]
      : []),
  ];

  const props = [
    ...controls.map((c) => propCode(c, values[c.prop])),
    ...Object.entries(staticProps ?? {}).map(([prop, value]) => `${prop}="${value}"`),
  ].filter(Boolean);

  const children = childrenCode ?? (values.children ? String(values.children) : '');

  // Si no cabe en una línea, una prop por línea
  const inline = `<${component}${props.map((p) => ` ${p}`).join('')}`;
  const open = inline.length > 80 ? `<${component}\n${props.map((p) => `  ${p}`).join('\n')}\n` : inline;
  const jsx = children
    ? `${open}>${childrenCode ? `\n  ${children}\n` : children}</${component}>`
    : `${open}${open.endsWith('\n') ? '' : ' '}/>`;

  return `${imports.join('\n')}\n\n${jsx}`;
}

/* ══ CONTROLES ══ */

function ControlField({
  control,
  value,
  onChange,
}: {
  control: Control;
  value: Values[string];
  onChange: (value: Values[string]) => void;
}) {
  const label = <span className="font-mono text-body-sm text-neutral-600">{control.prop}</span>;

  if (control.type === 'boolean') {
    return (
      <Switch checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} className="min-h-8">
        {label}
      </Switch>
    );
  }

  if (control.type === 'select') {
    return (
      <div className="flex flex-col gap-1.5">
        {label}
        <div className="flex flex-wrap gap-1.5">
          {control.options.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={value === option}
              onClick={() => onChange(option)}
              className={cn(
                'rounded-sm border px-2.5 py-1 text-label-sm transition-colors',
                value === option
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-neutral-100 bg-white text-navy-900 hover:border-neutral-400',
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (control.type === 'icon') {
    return (
      <label className="flex flex-col gap-1.5">
        {label}
        <select
          value={String(value ?? '')}
          onChange={(event) => onChange(event.target.value || undefined)}
          className="h-9 rounded-sm border border-neutral-400 bg-white px-2 text-body"
        >
          {!control.required && <option value="">— ninguno —</option>}
          {iconNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="flex flex-col gap-1.5">
      {label}
      <input
        type={control.type === 'number' ? 'number' : 'text'}
        value={String(value ?? '')}
        onChange={(event) => onChange(control.type === 'number' ? Number(event.target.value) : event.target.value)}
        className="h-9 rounded-sm border border-neutral-400 bg-white px-2 text-body"
      />
    </label>
  );
}

/* ══ PLAYGROUND · controles + vista en vivo + código ══ */

export function Playground({ render, previewClassName, ...config }: PlaygroundProps) {
  const [values, setValues] = useState<Values>(() =>
    Object.fromEntries(config.controls.map((c) => [c.prop, c.default])),
  );
  // Para la vista: íconos como componente y textos vacíos como undefined
  const previewProps: PreviewProps = { ...config.staticProps };
  for (const control of config.controls) {
    const value = values[control.prop];
    if (control.type === 'icon') previewProps[control.prop] = getIcon(value as string);
    else if (control.type === 'text' && value === '' && control.prop !== 'children')
      previewProps[control.prop] = undefined;
    else previewProps[control.prop] = value;
  }

  const code = buildCode({ ...config, values });

  return (
    <section className="flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        {/* La key vuelve a montar el átomo al cambiar una prop: así defaultChecked, defaultValue… se aplican */}
        <div
          className={cn(
            'flex min-h-56 items-center justify-center rounded-xl border border-neutral-100 bg-white p-8',
            previewClassName,
          )}
        >
          <div key={JSON.stringify(values)} className="contents">
            {render(previewProps)}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-neutral-100 bg-neutral-50/50 p-5">
          <span className="text-overline text-neutral-500 uppercase">Props</span>
          {config.controls.map((control) => (
            <ControlField
              key={control.prop}
              control={control}
              value={values[control.prop]}
              onChange={(value) => setValues((current) => ({ ...current, [control.prop]: value }))}
            />
          ))}
        </div>
      </div>

      <CodeBlock code={code} />
    </section>
  );
}

/* ══ CÓDIGO · bloque oscuro con botón de copiar ══ */

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-xl bg-navy-950 p-5 font-mono text-body-sm text-navy-50">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute top-3 right-3 rounded-sm bg-navy-800 px-2.5 py-1 text-label-sm text-white hover:bg-navy-700"
      >
        {copied ? 'Copiado' : 'Copiar'}
      </button>
    </div>
  );
}

/* ══ GALERÍA · todas las variantes juntas, como en Figma ══ */

export function Gallery({ title = 'Todas las variantes', children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3">{title}</h2>
      <div className="flex flex-col divide-y divide-neutral-100 rounded-xl border border-neutral-100 bg-white px-6">
        {children}
      </div>
    </section>
  );
}

export function Row({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:gap-6">
      <span className="w-36 shrink-0 font-mono text-body-sm text-neutral-500">{label}</span>
      <div className={cn('flex flex-wrap items-center gap-4', className)}>{children}</div>
    </div>
  );
}
