import { CheckIcon } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

// Política de contraseña del contrato (RNF-SEG-001 a 003). Es una ayuda visual mientras se escribe:
// quien decide es la API, que además revisa que la contraseña no esté filtrada.
// Las reglas imitan las de Laravel (Password::min()->numbers()->symbols()) para que no se contradigan
const rules = [
  {
    label: 'Entre 10 y 64 caracteres',
    test: (password: string) => [...password].length >= 10 && [...password].length <= 64,
  },
  { label: 'Al menos un número', test: (password: string) => /\p{N}/u.test(password) },
  {
    label: 'Al menos un símbolo, por ejemplo ! # $ o un espacio',
    test: (password: string) => /[\p{Z}\p{S}\p{P}]/u.test(password),
  },
];

export function PasswordRules({ password }: { password: string }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-md bg-neutral-50 px-3.5 py-3">
      <ul className="flex flex-col gap-1">
        {rules.map((rule) => {
          const met = rule.test(password);

          return (
            <li
              key={rule.label}
              className={cn('flex items-center gap-2 text-body-sm', met ? 'text-green-700' : 'text-neutral-500')}
            >
              {met ? (
                <CheckIcon size={16} />
              ) : (
                <span className="grid size-4 place-items-center" aria-hidden="true">
                  <span className="size-1.5 rounded-full bg-neutral-300" />
                </span>
              )}
              {rule.label}
              {/* El lector no ve el check: se le dice en texto */}
              <span className="sr-only">{met ? '(cumplido)' : '(pendiente)'}</span>
            </li>
          );
        })}
      </ul>
      <p className="text-body-sm text-neutral-500">
        También revisamos que no aparezca en filtraciones de datos conocidas.
      </p>
    </div>
  );
}
