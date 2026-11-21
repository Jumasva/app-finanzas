import { useEffect, useRef, type RefObject } from 'react';

// Abre y cierra un <dialog> como modal según `open`. showModal() atrapa el foco, deja inerte el resto
// de la página y Escape dispara cancel. `initialFocus`: el elemento que recibe el foco al abrir
export function useModal(open: boolean, initialFocus?: RefObject<HTMLElement | null>) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) {
      element.showModal();
      initialFocus?.current?.focus();
    }
    if (!open && element.open) element.close();
  }, [open, initialFocus]);

  return dialog;
}
