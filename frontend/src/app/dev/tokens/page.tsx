import { notFound } from 'next/navigation';

// Página solo para desarrollo: muestra los tokens para compararlos con Figma

// Cada clase va escrita completa: Tailwind lee el archivo como texto y no ve clases armadas con `bg-${…}`
const colorGroups = [
  {
    title: 'brand',
    tokens: [
      { name: 'brand-primary', className: 'bg-brand-primary' },
      { name: 'brand-primary-hover', className: 'bg-brand-primary-hover' },
      { name: 'brand-secondary', className: 'bg-brand-secondary' },
      { name: 'brand-tertiary', className: 'bg-brand-tertiary' },
      { name: 'brand-accent', className: 'bg-brand-accent' },
    ],
  },
  {
    title: 'content',
    tokens: [
      { name: 'content-primary', className: 'bg-content-primary' },
      { name: 'content-secondary', className: 'bg-content-secondary' },
      { name: 'content-tertiary', className: 'bg-content-tertiary' },
      { name: 'content-inverse', className: 'bg-content-inverse' },
      { name: 'content-link', className: 'bg-content-link' },
    ],
  },
  {
    title: 'background',
    tokens: [
      { name: 'background-page', className: 'bg-background-page' },
      { name: 'background-subtle', className: 'bg-background-subtle' },
      { name: 'background-brand-subtle', className: 'bg-background-brand-subtle' },
      { name: 'background-inverse', className: 'bg-background-inverse' },
    ],
  },
  {
    title: 'border',
    tokens: [
      { name: 'border-default', className: 'bg-border-default' },
      { name: 'border-subtle', className: 'bg-border-subtle' },
      { name: 'border-focus', className: 'bg-border-focus' },
    ],
  },
  {
    title: 'success',
    tokens: [
      { name: 'success', className: 'bg-success' },
      { name: 'success-dark', className: 'bg-success-dark' },
      { name: 'success-light', className: 'bg-success-light' },
    ],
  },
  {
    title: 'warning',
    tokens: [
      { name: 'warning', className: 'bg-warning' },
      { name: 'warning-dark', className: 'bg-warning-dark' },
      { name: 'warning-light', className: 'bg-warning-light' },
    ],
  },
  {
    title: 'danger',
    tokens: [
      { name: 'danger', className: 'bg-danger' },
      { name: 'danger-dark', className: 'bg-danger-dark' },
      { name: 'danger-light', className: 'bg-danger-light' },
    ],
  },
  {
    title: 'info',
    tokens: [
      { name: 'info', className: 'bg-info' },
      { name: 'info-dark', className: 'bg-info-dark' },
      { name: 'info-light', className: 'bg-info-light' },
    ],
  },
];

// spec repite la tabla de Figma (tamaño / interlineado · peso) para comparar a ojo
const textStyles = [
  { name: 'display', className: 'text-display font-heading', spec: '36/44 · 800 · móvil 30/38', sample: '$4.250.000' },
  { name: 'h1', className: 'text-h1 font-heading', spec: '30/38 · 700 · móvil 26/34', sample: 'Título de la página' },
  { name: 'h2', className: 'text-h2 font-heading', spec: '24/32 · 700 · móvil 22/30', sample: 'Título de formularios y secciones' },
  { name: 'h3', className: 'text-h3 font-heading', spec: '20/28 · 700 · móvil 18/26', sample: 'Título de tarjetas' },
  { name: 'h4', className: 'text-h4 font-heading', spec: '18/24 · 600 · móvil 16/24', sample: 'Modales, subtítulos de sección' },
  { name: 'body-lg', className: 'text-body-lg', spec: '16/24 · 400', sample: 'Registra tus gastos y mira crecer tus ahorros.' },
  { name: 'body', className: 'text-body', spec: '14/20 · 400', sample: 'Ingresa tus datos para continuar.' },
  { name: 'body-sm', className: 'text-body-sm', spec: '12/16 · 400', sample: '23 oct 2026 · Mercado' },
  { name: 'label-lg', className: 'text-label-lg', spec: '16/24 · 600', sample: 'Iniciar sesión' },
  { name: 'label', className: 'text-label', spec: '14/20 · 600', sample: 'Correo electrónico' },
  { name: 'label-sm', className: 'text-label-sm', spec: '12/16 · 500', sample: 'Alimentación' },
  { name: 'overline', className: 'text-overline uppercase', spec: '12/16 · 600 · +0.5', sample: 'Resumen del mes' },
  { name: 'number', className: 'text-number tabular-nums', spec: '14/20 · 500 · tabular', sample: '$1.250.000 · $980.000' },
];

const radii = [
  { name: 'rounded-sm', className: 'rounded-sm', spec: '5 px' },
  { name: 'rounded-md', className: 'rounded-md', spec: '10 px' },
  { name: 'rounded-lg', className: 'rounded-lg', spec: '12 px' },
  { name: 'rounded-xl', className: 'rounded-xl', spec: '16 px' },
  { name: 'rounded-full', className: 'rounded-full', spec: '999 px' },
];

const shadows = [
  { name: 'shadow-elevation-1', className: 'shadow-elevation-1', spec: 'segmented, switch' },
  { name: 'shadow-elevation-2', className: 'shadow-elevation-2', spec: 'menús desplegables' },
  { name: 'shadow-elevation-3', className: 'shadow-elevation-3', spec: 'modal, panel' },
];

export default function TokensPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main className="flex flex-col gap-12 p-8">
      <h1 className="text-h1">Tokens de diseño</h1>

      {/* Colores semánticos */}
      <section className="flex flex-col gap-6">
        <h2 className="text-h2">Colores</h2>

        {colorGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h3 className="text-overline text-content-secondary uppercase">{group.title}</h3>

            <div className="flex flex-wrap gap-4">
              {group.tokens.map((token) => (
                <div key={token.name} className="flex w-32 flex-col gap-2">
                  <div className={`border-border-subtle h-16 rounded-md border ${token.className}`} />
                  <span className="text-body-sm">{token.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Tipografía: achica la ventana a menos de 768 px y los títulos deben bajar a los valores de móvil */}
      <section className="flex flex-col gap-6">
        <h2 className="text-h2">Tipografía</h2>

        <div className="flex flex-col gap-4">
          {textStyles.map((style) => (
            <div key={style.name} className="border-border-subtle flex flex-col gap-1 border-b pb-4">
              <span className="text-body-sm text-content-tertiary">
                text-{style.name} · {style.spec}
              </span>
              <p className={style.className}>{style.sample}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Radios */}
      <section className="flex flex-col gap-6">
        <h2 className="text-h2">Radios</h2>

        <div className="flex flex-wrap gap-6">
          {radii.map((radius) => (
            <div key={radius.name} className="flex flex-col items-center gap-2">
              <div className={`border-brand-primary bg-background-brand-subtle size-20 border-2 ${radius.className}`} />
              <span className="text-body-sm">{radius.name}</span>
              <span className="text-body-sm text-content-tertiary">{radius.spec}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sombras: sobre fondo gris para que se noten */}
      <section className="flex flex-col gap-6">
        <h2 className="text-h2">Sombras</h2>

        <div className="bg-background-subtle flex flex-wrap gap-8 rounded-xl p-8">
          {shadows.map((shadow) => (
            <div key={shadow.name} className={`bg-background-page flex w-48 flex-col gap-1 rounded-lg p-6 ${shadow.className}`}>
              <span className="text-label">{shadow.name}</span>
              <span className="text-body-sm text-content-tertiary">{shadow.spec}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
