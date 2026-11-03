'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { authHeroes, defaultAuthHero } from '@/features/auth/hero-content';

// Panel de marca de las pantallas de autenticación: elige imagen y textos según la URL
export function AuthHero() {
  const pathname = usePathname();
  const hero = authHeroes[pathname] ?? defaultAuthHero;

  return (
    <aside className="hidden w-[38%] flex-col gap-10 overflow-hidden rounded-[28px] bg-auth-hero p-12 lg:sticky lg:top-4 lg:flex lg:h-[calc(100vh-2rem)]">
      <Image src="/logo/logo_horizontal_blanco.svg" alt="Finanzas" width={130} height={36} />

      <div className="relative mt-10 min-h-0 flex-1 [@media(max-height:800px)]:mt-0">
        <Image src={hero.image} alt="" fill className="object-contain object-top" />
      </div>

      <div className="flex max-w-[480px] flex-col gap-3">
        <p className="font-heading text-display whitespace-pre-line text-content-inverse">{hero.title}</p>
        <p className="text-body-lg text-navy-200">{hero.text}</p>
      </div>
    </aside>
  );
}