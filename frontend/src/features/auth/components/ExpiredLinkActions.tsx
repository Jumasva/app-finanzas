import { ButtonLink } from '@/components/ui/atoms/Button';

// Botones del estado «Este enlace ya no sirve». Se usa en los tres flujos con enlace;
// el botón principal lleva a pedir uno nuevo en cada flujo (verificación, contraseña, reactivación)
export function ExpiredLinkActions({ retryHref }: { retryHref: string }) {
  return (
    <div className="flex flex-col gap-3">
      <ButtonLink href={retryHref} size="lg">
        Pedir un enlace nuevo
      </ButtonLink>
      <ButtonLink href="/ingresar" variant="secondary" size="lg">
        Volver a iniciar sesión
      </ButtonLink>
    </div>
  );
}
