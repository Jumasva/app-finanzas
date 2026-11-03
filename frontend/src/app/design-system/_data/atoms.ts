// Átomos que muestra /design-system: el slug es la URL (/design-system/<slug>)
// La descripción es el subtítulo de cada ficha en Figma › Atomic Design

export type AtomInfo = {
  slug: string;
  name: string;
  description: string;
};

export const atoms: AtomInfo[] = [
  { slug: 'button', name: 'Button', description: 'Hace una acción. Para navegar se usa ButtonLink o TextLink.' },
  {
    slug: 'text-link',
    name: 'TextLink',
    description: 'Para navegar. Si la acción cambia datos, usa un Button tertiary.',
  },
  {
    slug: 'input',
    name: 'Input',
    description: 'Solo la caja. La etiqueta y el texto de ayuda son átomos aparte; juntos forman FormField.',
  },
  { slug: 'label', name: 'Label', description: 'Siempre visible. Va 8 px encima del input.' },
  {
    slug: 'helper-text',
    name: 'HelperText',
    description: 'Ayuda, error o éxito debajo del input (6 px). Se conecta con aria-describedby.',
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    description: 'Caja de 20 px con zona táctil de 44 px. Para opciones que se confirman con un botón.',
  },
  { slug: 'radio', name: 'Radio', description: 'Una sola opción de un grupo. Los radios del grupo comparten name.' },
  { slug: 'switch', name: 'Switch', description: 'Un ajuste que se aplica al instante, sin botón de guardar.' },
  { slug: 'badge', name: 'Badge', description: 'Etiqueta corta de estado o categoría. Nunca solo por color.' },
  {
    slug: 'chip',
    name: 'Chip',
    description: 'Filtro que se activa y se desactiva; puede llevar ícono o ser removible.',
  },
  { slug: 'avatar', name: 'Avatar', description: 'Foto o iniciales del usuario. Siempre circular.' },
  {
    slug: 'category-icon',
    name: 'CategoryIcon',
    description: 'Identifica la categoría de cada movimiento. Cada categoría tiene un color fijo de la paleta.',
  },
  {
    slug: 'amount',
    name: 'Amount',
    description: 'Muestra dinero. El signo siempre acompaña al color, para no depender del rojo y el verde.',
  },
  {
    slug: 'divider',
    name: 'Divider',
    description: 'Línea de 1 px para separar contenido. Úsalo solo cuando el espacio en blanco no alcanza.',
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    description: 'Texto corto al pasar el mouse o enfocar. Nunca para información importante: en móvil no hay hover.',
  },
  {
    slug: 'progress-bar',
    name: 'ProgressBar',
    description:
      'Avance de presupuestos y metas. El color cambia según el porcentaje, que siempre se muestra en texto.',
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    description: 'Para acciones cortas (guardar, enviar). 16 botón small · 20 botón, input · 24 tarjeta · 32 pantalla.',
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    description: 'Para contenido que está cargando, con la misma forma del contenido real.',
  },
  {
    slug: 'icons',
    name: 'Icons',
    description: 'Trazo de Lucide, 24 × 24, trazo 2. El color se hereda del componente que lo contiene.',
  },
];
