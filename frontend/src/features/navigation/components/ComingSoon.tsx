import type { IconComponent } from '@/components/ui/atoms/icons';

/* ══ COMINGSOON · pantalla provisional de un módulo que aún no se construye ══ */
/* Mantiene los enlaces del Sidebar funcionando. Se reemplaza al construir cada módulo */

type ComingSoonProps = {
  title: string;
  icon: IconComponent;
  // Qué se podrá hacer aquí, en una frase
  description: string;
};

export function ComingSoon({ title, icon: Icon, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <h1 className="text-h1 text-content-primary">{title}</h1>

      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border-default px-6 py-16 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-background-brand-subtle text-brand-primary">
          <Icon size={24} />
        </span>
        <p className="text-h4 text-content-primary">Muy pronto</p>
        <p className="max-w-md text-body text-content-secondary">{description}</p>
      </div>
    </div>
  );
}
