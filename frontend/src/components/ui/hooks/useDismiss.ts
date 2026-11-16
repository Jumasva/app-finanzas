import { useEffect, type RefObject } from 'react';

// Cierra un desplegable (menú, select, calendario) con un clic fuera de `root`.
// Escape lo maneja cada componente, porque además debe devolver el foco a su botón
export function useDismiss(root: RefObject<HTMLElement | null>, open: boolean, onDismiss: () => void) {
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) onDismiss();
    }

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [root, open, onDismiss]);
}
