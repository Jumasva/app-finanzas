import { CheckIcon } from '@/components/ui/atoms/icons';

// Lista de datos útiles con check verde: «El enlace vale 24 horas…», «Si no lo ves, revisa la carpeta de spam»
export function AuthChecklist({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-body-sm text-neutral-600">
          <CheckIcon size={16} className="text-green-600" />
          {item}
        </li>
      ))}
    </ul>
  );
}
