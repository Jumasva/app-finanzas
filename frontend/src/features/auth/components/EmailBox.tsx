import { MailIcon } from '@/components/ui/atoms/icons';

type EmailBoxProps = {
  label: string;
  email: string;
  // Enlace a la derecha: «Cambiar»
  action?: React.ReactNode;
};

// Caja gris con el correo al que se refiere la pantalla: «Enviamos el enlace a…», «Correo a verificar», «Cuenta»
export function EmailBox({ label, email, action }: EmailBoxProps) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-neutral-50 px-4 py-3">
      <MailIcon size={20} className="text-neutral-500" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-body-sm text-neutral-500">{label}</span>
        <span className="truncate text-label text-navy-900">{email}</span>
      </div>
      {action}
    </div>
  );
}
