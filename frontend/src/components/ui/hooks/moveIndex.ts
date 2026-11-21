type Axis = 'horizontal' | 'vertical' | 'both';

const steps: Record<Axis, Record<string, number>> = {
  horizontal: { ArrowLeft: -1, ArrowRight: 1 },
  vertical: { ArrowUp: -1, ArrowDown: 1 },
  both: { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 },
};

// La posición a la que lleva una tecla en una lista navegable con flechas (tabs, radios, menú, opciones).
// Inicio y Fin van al primero y al último. undefined: la tecla no mueve. wrap: del último se pasa al primero
export function moveIndex(
  key: string,
  index: number,
  count: number,
  { axis = 'both', wrap = true }: { axis?: Axis; wrap?: boolean } = {},
) {
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;

  const step = steps[axis][key];
  if (step === undefined) return undefined;

  const next = index + step;
  if (wrap) return (next + count) % count;
  return Math.min(Math.max(next, 0), count - 1);
}
