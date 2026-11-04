import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge no conoce nuestros tokens: se le dice que text-h1, text-label… son tamaños (no colores)
// y que shadow-elevation-* son sombras, para que no los borre al combinarlos con text-content-* o similares
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'display',
        'h1',
        'h2',
        'h3',
        'h4',
        'body-lg',
        'body',
        'body-sm',
        'label-lg',
        'label',
        'label-sm',
        'overline',
        'number',
      ],
      shadow: ['elevation-1', 'elevation-2', 'elevation-3'],
    },
  },
});

// Junta clases condicionales y resuelve los choques de Tailwind (gana la última)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
