import { generalNav, isActivePath, mainNav } from '@/features/navigation/items';

export type Crumb = { label: string; href: string };

// Páginas que cuelgan de un módulo y su nombre en la barra superior. Se agregan aquí al crearlas
const subpages: Record<string, string> = {
  '/movimientos/nuevo': 'Nuevo movimiento',
  '/ajustes/perfil': 'Mi perfil',
};

/* ══ BREADCRUMBS · el título de la barra superior según la ruta ══ */
/* /inicio → [Inicio] · /movimientos/nuevo → [Movimientos, Nuevo movimiento]. El último es la página actual */

export function breadcrumbs(pathname: string): Crumb[] {
  const section = [...mainNav, ...generalNav].find((item) => isActivePath(pathname, item.href));
  if (!section) return [];

  const crumbs: Crumb[] = [{ label: section.label, href: section.href }];
  const subpage = subpages[pathname];
  if (pathname !== section.href && subpage) crumbs.push({ label: subpage, href: pathname });

  return crumbs;
}
