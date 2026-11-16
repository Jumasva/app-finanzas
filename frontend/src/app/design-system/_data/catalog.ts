// Componentes que muestra /design-system: el slug es la URL (/design-system/<slug>)
// La descripción es el subtítulo de cada ficha en Figma › Atomic Design

export type Level = 'atom' | 'molecule' | 'organism';

export type ComponentInfo = {
  slug: string;
  name: string;
  description: string;
  // Desde dónde se importa: va en el encabezado de la página
  importFrom: string;
};

// Títulos de cada nivel, en el orden en que se muestran
export const levels: { level: Level; title: string }[] = [
  { level: 'atom', title: 'Átomos' },
  { level: 'molecule', title: 'Moléculas' },
  { level: 'organism', title: 'Organismos' },
];

const atoms: Omit<ComponentInfo, 'importFrom'>[] = [
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
    slug: 'alert',
    name: 'Alert',
    description: 'Mensaje dentro de la página que se queda hasta que el usuario lo cierre o lo resuelva (M08).',
  },
  {
    slug: 'icons',
    name: 'Icons',
    description: 'Trazo de Lucide, 24 × 24, trazo 2. El color se hereda del componente que lo contiene.',
  },
];

const molecules: Omit<ComponentInfo, 'importFrom'>[] = [
  {
    slug: 'form-field',
    name: 'FormField',
    description: 'Label + Input + HelperText. Es la molécula más usada: login, registro, perfil (M01).',
  },
  {
    slug: 'search-bar',
    name: 'SearchBar',
    description: 'Busca por descripción, categoría o monto. Puede llevar un botón de filtros al lado (M02).',
  },
  {
    slug: 'segmented-control',
    name: 'SegmentedControl',
    description: 'Cambia la vista del mismo contenido: Gastos / Ingresos, Mes / Año (M03).',
  },
  { slug: 'tabs', name: 'Tabs', description: 'Navega entre secciones de una página (M03).' },
  {
    slug: 'period-selector',
    name: 'PeriodSelector',
    description: 'Cambia el periodo que se está viendo. Está en el panel, movimientos e informes (M04).',
  },
  {
    slug: 'select',
    name: 'Select',
    description: 'Elegir una opción de una lista: cuenta, categoría, moneda. El menú es el de M14 (M13).',
  },
  {
    slug: 'dropdown-menu',
    name: 'DropdownMenu',
    description: 'Lista de acciones que se abre desde un botón (⋯) o desde el user menu (M14).',
  },
  {
    slug: 'date-field',
    name: 'DateField',
    description: 'Campo de fecha que abre el calendario (Date picker). La fecha viaja como YYYY-MM-DD (M15).',
  },
  {
    slug: 'amount-entry',
    name: 'AmountEntry',
    description: 'El monto grande del formulario de movimiento, con teclado numérico (M15).',
  },
  {
    slug: 'option-card',
    name: 'OptionCard',
    description: 'Elegir entre opciones con descripción. Es un radio: el grupo comparte name (M16).',
  },
  {
    slug: 'setting-row',
    name: 'SettingRow',
    description: 'Cada opción de configuración: con switch, con valor y navegación, con botón o destructiva (M17).',
  },
  {
    slug: 'section-header',
    name: 'SectionHeader',
    description: 'El encabezado de cada tarjeta o bloque del panel (M17).',
  },
  {
    slug: 'stat-card',
    name: 'StatCard',
    description: 'Una cifra clave del mes con su variación. El color depende del significado, no de si sube (M07).',
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    description: 'Para tablas largas en desktop; en móvil la lista usa «Cargar más» (M18).',
  },
  {
    slug: 'breadcrumbs',
    name: 'Breadcrumbs',
    description: 'Dónde está el usuario y cómo volver. Solo pinta la lista que recibe (M18).',
  },
  {
    slug: 'detail-list',
    name: 'DetailList',
    description: 'Filas de dato y valor para ver el detalle de un registro (M21).',
  },
  {
    slug: 'legend-item',
    name: 'LegendItem',
    description: 'Acompaña las gráficas: color, nombre, monto y porcentaje (M20).',
  },
  {
    slug: 'empty-state',
    name: 'EmptyState',
    description: 'Lo que se ve cuando una lista está vacía: qué va ahí y un botón para empezar (M12).',
  },
  {
    slug: 'toast',
    name: 'Toast',
    description: 'Confirmación temporal después de una acción. Se muestra con useToast() (M09).',
  },
  {
    slug: 'notification-button',
    name: 'NotificationButton',
    description: 'La campana de la topbar con el contador de avisos sin leer (M11).',
  },
];

const organisms: Omit<ComponentInfo, 'importFrom'>[] = [
  {
    slug: 'dialog',
    name: 'Dialog',
    description: 'Contenedor flotante: Modal centrado (crear un movimiento) o Drawer lateral (ver el detalle).',
  },
  {
    slug: 'confirm-dialog',
    name: 'ConfirmDialog',
    description: 'Confirmar una acción que no se puede deshacer: anular, desactivar la cuenta.',
  },
  {
    slug: 'date-picker',
    name: 'DatePicker',
    description: 'Calendario con atajos. «Hoy» es la fecha de America/Bogota (RN-GEN-001).',
  },
  {
    slug: 'page-header',
    name: 'PageHeader',
    description: 'El encabezado de cada página interna: título, resumen y acciones.',
  },
  {
    slug: 'error-state',
    name: 'ErrorState',
    description: 'Pantallas de error completas: sin conexión, página no encontrada, error del servidor.',
  },
  {
    slug: 'settings-group',
    name: 'SettingsGroup',
    description: 'La página de ajustes agrupada por secciones, cada una con sus Setting rows.',
  },
];

// Nombre del archivo a partir del nombre del componente; Alert es átomo aunque en Figma sea M08
const folder: Record<Level, string> = { atom: 'atoms', molecule: 'molecules', organism: 'organisms' };

function withImport(level: Level, items: Omit<ComponentInfo, 'importFrom'>[]) {
  return items.map((item) => ({
    ...item,
    level,
    importFrom: item.slug === 'icons' ? '@/components/ui/atoms/icons' : `@/components/ui/${folder[level]}/${item.name}`,
  }));
}

export const catalog: (ComponentInfo & { level: Level })[] = [
  ...withImport('atom', atoms),
  ...withImport('molecule', molecules),
  ...withImport('organism', organisms),
];
