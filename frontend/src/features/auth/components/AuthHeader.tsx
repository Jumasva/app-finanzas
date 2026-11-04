'use client';

import Image from 'next/image';
import { ChevronLeftIcon } from '@/components/ui/atoms/icons';
import { useAuthScreen } from '@/features/auth/hooks/useAuthScreen';
import { ButtonLink } from '@/components/ui/atoms/Button';
import { TextLink } from '@/components/ui/atoms/TextLink';

// Header de las pantallas de autenticación: invita a crear cuenta, a iniciar sesión o a volver
export function AuthHeader() {
  const { header } = useAuthScreen();

  return (
    <header className="flex items-center justify-between gap-4 px-4 pt-6 md:px-8 lg:justify-end">
      {/* En móvil el panel de marca no se ve, así que el logo sube aquí */}
      <Image src="/logo/logo_horizontal.svg" alt="Finanzas" width={115} height={32} className="lg:hidden" />

      {header.kind === 'cta' ? (
        <div className="flex items-center gap-3">
          <span className="hidden text-body-md text-content-secondary sm:inline">{header.question}</span>

          {/* md y secondary: más visible, sin competir con el botón primario del formulario */}
          <ButtonLink href={header.href} variant="primary" size="md">
            {header.label}
          </ButtonLink>
        </div>
      ) : (
        <TextLink href={header.href} variant="standalone" iconLeft={ChevronLeftIcon}>
          {header.label}
        </TextLink>
      )}
    </header>
  );
}
