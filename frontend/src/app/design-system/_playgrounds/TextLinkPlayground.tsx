'use client';

import { ArrowRightIcon, ChevronLeftIcon } from '@/components/ui/atoms/icons';
import { TextLink } from '@/components/ui/atoms/TextLink';
import { Gallery, Playground, Row } from '../_components/Playground';

type TextLinkProps = React.ComponentProps<typeof TextLink>;

export function TextLinkPlayground() {
  return (
    <>
      <Playground
        component="TextLink"
        importFrom="@/components/ui/atoms/TextLink"
        staticProps={{ href: '#' }}
        controls={[
          { type: 'select', prop: 'variant', options: ['standalone', 'inline'], default: 'standalone' },
          { type: 'text', prop: 'children', default: 'Ver todo' },
          { type: 'icon', prop: 'iconLeft' },
          { type: 'icon', prop: 'iconRight' },
        ]}
        // inline va dentro de un párrafo, así se ve como en la app
        render={(props) =>
          props.variant === 'inline' ? (
            <p className="text-body">
              Acepto los <TextLink {...(props as unknown as TextLinkProps)} /> del servicio.
            </p>
          ) : (
            <TextLink {...(props as unknown as TextLinkProps)} />
          )
        }
      />

      <Gallery>
        <Row label="standalone">
          <TextLink href="#">¿Olvidaste tu contraseña?</TextLink>
        </Row>
        <Row label="inline">
          <p className="text-body">
            Acepto los{' '}
            <TextLink href="#" variant="inline">
              términos y condiciones
            </TextLink>
            .
          </p>
        </Row>
        <Row label="iconRight">
          <TextLink href="#" iconRight={ArrowRightIcon}>
            Ver todo
          </TextLink>
        </Row>
        <Row label="iconLeft">
          <TextLink href="#" iconLeft={ChevronLeftIcon}>
            Volver a iniciar sesión
          </TextLink>
        </Row>
      </Gallery>
    </>
  );
}
