'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useAuthScreen } from '@/features/auth/hooks/useAuthScreen';

// Header de las pantallas de autenticación: invita a crear cuenta, a iniciar sesión o a volver
export function AuthHeader() {
  const { header } = useAuthScreen();

  return (
    <header className="flex items-center justify-between gap-4 px-4 pt-6 md:px-8 lg:justify-end">
      {/* En móvil el panel de marca no se ve, así que el logo sube aquí */}
      <Image src="/logo/logo_horizontal.svg" alt="Finanzas" width={115} height={32} className="lg:hidden" />

      {header.kind === 'cta' ? (
        <div className="flex items-center gap-3">
          <span className="hidden text-body-sm text-content-secondary sm:inline">{header.question}</span>
          {/* Provisional: se reemplaza por el átomo Button (secundario, pequeño) */}
          <Link
            href={header.href}
            className="rounded-md border border-brand-primary px-3 py-1.5 text-label text-content-link"
          >
            {header.label}
          </Link>
        </div>
      ) : (
        <Link href={header.href} className="flex items-center gap-1 text-label text-content-link">
          <ChevronLeft className="size-4" aria-hidden="true" />
          {header.label}
        </Link>
      )}
    </header>
  );
}