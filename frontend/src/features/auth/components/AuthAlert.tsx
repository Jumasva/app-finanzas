import { Alert } from '@/components/ui/atoms/Alert';
import type { FormAlert } from '@/features/auth/hooks/useApiForm';
import { formatWait } from '@/lib/format';

// El aviso del formulario. Si hay bloqueo (429), dice cuánto falta para poder intentar de nuevo
export function AuthAlert({ alert, wait }: { alert?: FormAlert; wait: number }) {
  if (!alert) return null;

  return (
    <Alert variant={alert.variant}>
      <p>{alert.message}</p>
      {alert.variant === 'warning' && wait > 0 && <p>Podrás intentarlo de nuevo en {formatWait(wait)}.</p>}
    </Alert>
  );
}
