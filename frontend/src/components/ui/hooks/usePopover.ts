import { useEffect, useRef, useState } from 'react';

// Estado de un desplegable (menú, Select, calendario): abierto o cerrado, y se cierra con un clic fuera de `root`.
// Escape lo maneja cada componente, porque además debe devolver el foco a su botón
export function usePopover<T extends HTMLElement = HTMLDivElement>() {
  const [open, setOpen] = useState(false);
  const root = useRef<T>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return { open, setOpen, root };
}
