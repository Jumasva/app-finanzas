'use client';

import { Button, ButtonLink } from '@/components/ui/atoms/Button';
import { ArrowRightIcon, PlusIcon } from '@/components/ui/atoms/icons';
import { Gallery, Playground, Row } from '../_components/Playground';

const variants = ['primary', 'secondary', 'tertiary', 'destructive'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export function ButtonPlayground() {
  return (
    <>
      <Playground
        component="Button"
        importFrom="@/components/ui/atoms/Button"
        controls={[
          { type: 'select', prop: 'variant', options: variants, default: 'primary' },
          { type: 'select', prop: 'size', options: sizes, default: 'md' },
          { type: 'text', prop: 'children', default: 'Guardar' },
          { type: 'icon', prop: 'iconLeft' },
          { type: 'icon', prop: 'iconRight' },
          { type: 'boolean', prop: 'loading' },
          { type: 'boolean', prop: 'disabled' },
        ]}
        // Sin texto es un botón de solo ícono: necesita aria-label
        render={(props) => (
          <Button
            {...(props as React.ComponentProps<typeof Button>)}
            aria-label={props.children ? undefined : 'Acción'}
          />
        )}
      />

      <Gallery>
        {variants.map((variant) => (
          <Row key={variant} label={variant}>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                Guardar {size}
              </Button>
            ))}
            <Button variant={variant} disabled>
              Deshabilitado
            </Button>
            <Button variant={variant} loading>
              Cargando
            </Button>
          </Row>
        ))}
        <Row label="con ícono">
          <Button iconLeft={PlusIcon}>Nuevo gasto</Button>
          <Button variant="secondary" iconRight={ArrowRightIcon}>
            Continuar
          </Button>
          <Button variant="tertiary" iconLeft={PlusIcon} aria-label="Agregar" />
        </Row>
        <Row label="ButtonLink">
          <ButtonLink href="#" variant="secondary" size="sm">
            Crear cuenta
          </ButtonLink>
          <span className="text-body-sm text-neutral-500">Igual que Button, pero navega (es un enlace)</span>
        </Row>
      </Gallery>
    </>
  );
}
