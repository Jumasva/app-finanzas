'use client';

import { useAuthScreen } from '@/features/auth/hooks/useAuthScreen';
import type { AuthFormState } from '@/features/auth/screens';
import { cn } from '@/lib/cn';

type AuthFormHeaderProps = {
  // En qué estado está la pantalla; lo decide el formulario según lo que responda la API
  state?: AuthFormState;
  // Reemplaza {email} en la descripción
  email?: string;
};

// Pone el correo en negrita donde el texto dice {email}
function withEmail(text: string, email?: string) {
  const [before, after] = text.split('{email}');
  if (after === undefined) return text;

  return (
    <>
      {before}
      <strong className="font-semibold text-content-primary">{email}</strong>
      {after}
    </>
  );
}

// Overline, título y descripción encima del formulario, según la pantalla y su estado (textos en screens.ts)
export function AuthFormHeader({ state = 'initial', email }: AuthFormHeaderProps) {
  const { form } = useAuthScreen();
  // Si la pantalla no tiene ese estado, se queda con el inicial
  const content = form[state] ?? form.initial;

  return (
    <div className="flex flex-col gap-2">
      <p
        className={cn(
          'text-overline uppercase',
          content.tone === 'warning' ? 'text-warning-dark' : 'text-brand-secondary',
        )}
      >
        {content.overline}
      </p>
      <h1 className="text-h1">{content.title}</h1>
      <p className="text-body-lg text-content-secondary">{withEmail(content.description, email)}</p>
    </div>
  );
}
