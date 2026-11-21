'use client';

import { useRef, useState } from 'react';
import { Avatar } from '@/components/ui/atoms/Avatar';
import { Badge } from '@/components/ui/atoms/Badge';
import { Button } from '@/components/ui/atoms/Button';
import { DetailList } from '@/components/ui/molecules/DetailList';
import { FormField } from '@/components/ui/molecules/FormField';
import { SectionHeader } from '@/components/ui/molecules/SectionHeader';
import { ConfirmDialog } from '@/components/ui/organisms/ConfirmDialog';
import { PageHeader } from '@/components/ui/organisms/PageHeader';
import { useToast } from '@/components/ui/organisms/ToastProvider';
import type { User } from '@/features/auth/api';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { useSession, useUpdateSession } from '@/features/auth/session';
import { updateProfile } from '@/features/profile/api';
import { UnverifiedEmailAlert } from '@/features/profile/components/UnverifiedEmailAlert';
import { useApiForm } from '@/hooks/useApiForm';
import { formatDate, toBogotaDate } from '@/lib/date';
import { initials } from '@/lib/format';

type Changes = { name?: string; email?: string };

/* ══ PROFILEVIEW · /configuracion/perfil · RF-COACP (consultar y actualizar el perfil) ══ */
/* Los datos vienen de GET /auth/me (la sesión): el contrato no tiene GET /profile.
   Se editan nombre y correo con PATCH /profile, enviando solo lo que cambió. La fecha de nacimiento
   no se modifica: es el dato declarado al registrarse */

export function ProfileView() {
  const user = useSession();

  // Solo el primer instante, mientras /auth/me responde (la pantalla está oculta)
  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <PageHeader title="Mi perfil" description="Tus datos personales y cómo te contactamos." />

      <div className="flex w-full max-w-3xl flex-col gap-6">
        {!user.email_verified_at && <UnverifiedEmailAlert email={user.email} />}
        <ProfileSummary user={user} />
        {/* key: si el usuario cambia (se guardó), el formulario se monta con los valores nuevos */}
        <ProfileForm key={`${user.name}|${user.email}`} user={user} />
      </div>
    </div>
  );
}

/* ══ Tarjeta con quién es y los datos que no se editan ══ */

function ProfileSummary({ user }: { user: User }) {
  return (
    <section
      aria-label="Resumen de tu cuenta"
      className="flex flex-col gap-5 rounded-xl border border-border-subtle bg-background-page p-5 md:p-6"
    >
      <div className="flex items-center gap-4">
        <Avatar name={user.name} initials={initials(user.name)} size={48} aria-hidden="true" />
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-h4 text-content-primary">{user.name}</p>
          <p className="truncate text-body text-content-secondary">{user.email}</p>
        </div>
      </div>

      <DetailList
        items={[
          {
            label: 'Fecha de nacimiento',
            value: user.birth_date ? formatDate(user.birth_date) : 'No registrada',
          },
          { label: 'Miembro desde', value: formatDate(toBogotaDate(user.created_at)) },
          {
            label: 'Correo',
            value: user.email_verified_at ? (
              <Badge tone="success" dot>
                Verificado
              </Badge>
            ) : (
              <Badge tone="warning" dot>
                Sin verificar
              </Badge>
            ),
          },
        ]}
      />
    </section>
  );
}

/* ══ Formulario de nombre y correo ══ */

function ProfileForm({ user }: { user: User }) {
  const toast = useToast();
  const updateSession = useUpdateSession();
  const { loading, fieldErrors, alert, wait, run } = useApiForm();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  // Cambios que esperan confirmación: cambiar el correo obliga a verificarlo de nuevo (RF-VECOR-064)
  const pending = useRef<Changes | null>(null);
  const [confirmEmail, setConfirmEmail] = useState(false);

  // Se comparan sin espacios a los lados y el correo sin mayúsculas: así lo guarda la API
  const changes: Changes = {};
  if (name.trim() !== user.name) changes.name = name.trim();
  if (email.trim().toLowerCase() !== user.email) changes.email = email.trim();
  const dirty = Object.keys(changes).length > 0;

  async function save(data: Changes) {
    await run(async () => {
      const { data: updated } = await updateProfile(data);
      setConfirmEmail(false);
      toast({
        tone: 'success',
        message: data.email
          ? `Guardamos tus datos. Te enviamos un enlace a ${updated.email} para verificarlo.`
          : 'Guardamos tus datos.',
      });
      // Al final: cambia la key del formulario y lo vuelve a montar con los valores guardados
      updateSession(updated);
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!dirty) return;

    if (changes.email) {
      pending.current = changes;
      setConfirmEmail(true);
      return;
    }
    save(changes);
  }

  function discard() {
    setName(user.name);
    setEmail(user.email);
  }

  return (
    <section
      aria-labelledby="datos-personales"
      className="flex flex-col gap-5 rounded-xl border border-border-subtle bg-background-page p-5 md:p-6"
    >
      <SectionHeader
        id="datos-personales"
        title="Datos personales"
        description="Así aparece tu nombre en la app y a este correo te escribimos."
      />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <AuthAlert alert={alert} wait={wait.seconds} />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Nombre"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={fieldErrors.name}
          />
          <FormField
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={255}
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={fieldErrors.email}
            helper={changes.email ? 'Tendrás que verificar el correo nuevo.' : undefined}
          />
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={discard} disabled={!dirty || loading}>
            Descartar
          </Button>
          <Button type="submit" loading={loading} disabled={!dirty || wait.running}>
            Guardar cambios
          </Button>
        </div>
      </form>

      <ConfirmDialog
        open={confirmEmail}
        onClose={() => setConfirmEmail(false)}
        onConfirm={() => pending.current && save(pending.current)}
        loading={loading}
        tone="default"
        title="¿Cambiar tu correo?"
        description={
          <p>
            Te enviaremos un enlace a <strong className="font-semibold">{email.trim()}</strong>. Hasta que lo abras no
            podrás cambiar tu contraseña ni tu moneda, ni desactivar la cuenta.
          </p>
        }
        confirmLabel="Cambiar correo"
      />
    </section>
  );
}
