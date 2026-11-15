import type { Crumb } from '@/components/ui/molecules/Breadcrumbs';
import { generalNav, mainNav } from '@/features/navigation/items';

/* ══ BREADCRUMBS · las migas de la barra superior a partir de la ruta ══ */
/* Se parte la ruta en segmentos y cada uno acumula su href:
   /ajustes/perfil → [/ajustes «Ajustes», /ajustes/perfil «Mi perfil»] */

// El nombre de cada ruta. Los módulos ya tienen nombre en la navegación; aquí solo van las subpáginas
// cuyo nombre no sale del segmento (la URL no lleva tildes ni palabras extra: «nuevo» es «Nuevo movimiento»)
const labels: Record<string, string> = {
  ...Object.fromEntries([...mainNav, ...generalNav].map((item) => [item.href, item.label])),
  '/movimientos/nuevo': 'Nuevo movimiento',
  '/ajustes/perfil': 'Mi perfil',
};

// Sin nombre registrado: el segmento con mayúscula inicial y guiones como espacios (seguridad → «Seguridad»)
function labelFromSegment(segment: string) {
  const text = segment.replaceAll('-', ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function breadcrumbs(pathname: string): Crumb[] {
  const segments = pathname.split('/').filter(Boolean);

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    return { href, label: labels[href] ?? labelFromSegment(segment) };
  });
}
