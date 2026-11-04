import { CheckIcon, MinusIcon } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

/* ══ PASSWORDRULES · Figma › Molecules › Password + fuerza ══ */
/* Barra de fuerza y lista de reglas debajo del campo de contraseña (registro y restablecer).
   Diseño de Figma con las reglas del contrato (RNF-SEG-001 a 003), no las de la ficha (mínimo 8, mayúscula):
   decisión del 4 de noviembre de 2026. Es una ayuda visual: quien decide es la API, que además revisa
   que la contraseña no esté filtrada. Las reglas imitan las de Laravel para que no se contradigan */

const rules = [
  {
    label: 'Entre 10 y 64 caracteres',
    test: (password: string) => [...password].length >= 10 && [...password].length <= 64,
  },
  { label: 'Un número', test: (password: string) => /\p{N}/u.test(password) },
  {
    label: 'Un símbolo, por ejemplo ! # $ o un espacio',
    test: (password: string) => /[\p{Z}\p{S}\p{P}]/u.test(password),
  },
];

// Un segmento por regla cumplida. Los textos de 1 y 2 están por confirmar con diseño (solo se vio «Segura»)
const levels = [
  { label: '', bar: '', text: '' },
  { label: 'Débil', bar: 'bg-red-600', text: 'text-red-700' },
  { label: 'Regular', bar: 'bg-amber-500', text: 'text-amber-800' },
  { label: 'Segura', bar: 'bg-green-600', text: 'text-green-700' },
];

export function PasswordRules({ password }: { password: string }) {
  const results = rules.map((rule) => ({ ...rule, met: rule.test(password) }));
  const level = levels[results.filter((rule) => rule.met).length];

  return (
    <div className="flex flex-col gap-3">
      {/* Barra de fuerza: segmentos llenos según las reglas cumplidas, y el nivel a la derecha */}
      <div className="flex items-center gap-4">
        <div className="flex flex-1 gap-2" aria-hidden="true">
          {results.map((rule, index) => (
            <span
              key={rule.label}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors',
                index < levels.indexOf(level) ? level.bar : 'bg-neutral-50',
              )}
            />
          ))}
        </div>
        {/* aria-live: el lector anuncia el nivel cuando cambia */}
        <span className={cn('min-w-16 text-right text-label', level.text)} aria-live="polite">
          {level.label && <span className="sr-only">Fuerza de la contraseña: </span>}
          {level.label}
        </span>
      </div>

      <ul className="flex flex-col gap-1.5">
        {results.map((rule) => (
          <li
            key={rule.label}
            className={cn('flex items-center gap-2 text-body', rule.met ? 'text-green-700' : 'text-neutral-500')}
          >
            {rule.met ? <CheckIcon size={16} /> : <MinusIcon size={16} />}
            {rule.label}
            {/* El lector no ve el ícono: se le dice en texto */}
            <span className="sr-only">{rule.met ? '(cumplido)' : '(pendiente)'}</span>
          </li>
        ))}
      </ul>
      <p className="text-body-sm text-neutral-500">
        También revisamos que no aparezca en filtraciones de datos conocidas.
      </p>
    </div>
  );
}
