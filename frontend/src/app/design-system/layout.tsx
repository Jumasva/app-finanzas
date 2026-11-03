import { notFound } from 'next/navigation';
import { Nav } from './_components/Nav';

// Solo para desarrollo: muestra los tokens y cada átomo con sus props. En producción da 404
export default function DesignSystemLayout({ children }: LayoutProps<'/design-system'>) {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <div className="flex flex-1">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 overflow-y-auto border-r border-neutral-100 p-6 md:block">
        <Nav />
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
