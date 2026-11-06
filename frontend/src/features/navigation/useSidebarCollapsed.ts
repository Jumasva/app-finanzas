'use client';

import { useSyncExternalStore } from 'react';

/* ══ USESIDEBARCOLLAPSED · si el Sidebar está colapsado, recordado en este navegador ══ */
/* Es una comodidad por navegador, así que va en localStorage. Puede fallar (modo privado, datos bloqueados):
   entonces se recuerda solo mientras la pestaña esté abierta */

const KEY = 'sidebar-collapsed';
const listeners = new Set<() => void>();
let memory = false;

function read() {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return memory;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Otra pestaña lo cambió
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function write(collapsed: boolean) {
  memory = collapsed;
  try {
    localStorage.setItem(KEY, collapsed ? '1' : '0');
  } catch {
    // Sin localStorage queda en memoria
  }
  listeners.forEach((listener) => listener());
}

// useSyncExternalStore y no useState + useEffect: en el servidor siempre es expandido (false) y React
// corrige el valor al hidratar sin error de hidratación
export function useSidebarCollapsed() {
  const collapsed = useSyncExternalStore(subscribe, read, () => false);
  return { collapsed, toggle: () => write(!collapsed) };
}
