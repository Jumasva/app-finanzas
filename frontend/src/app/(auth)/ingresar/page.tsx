import { Button } from '@/components/ui/atoms/Button';
import { FormField } from '@/components/ui/molecules/FormField';
import { ArrowRightIcon } from '@/components/ui/atoms/icons';
import { AuthFormHeader } from '@/features/auth/components/AuthFormHeader';

export default function LoginPage() {
  return (
    <div>
      <AuthFormHeader />

      <form className="mt-6 flex w-[440px] flex-col gap-4">
        <FormField
          label="Correo electrónico"
          type="email"
          placeholder="Ingrese su correo electrónico"
          required
          helper="Ingrese un correo electrónico válido"
        />

        <Button type="submit" iconRight={ArrowRightIcon}>
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
}
