'use client';

import { Avatar } from '@/components/ui/atoms/Avatar';
import { Gallery, Playground, Row } from '../_components/Playground';

const sizes = [24, 32, 40, 48] as const;
// Imagen de ejemplo que ya está en public/
const sampleSrc = '/logo/isotipo.svg';

export function AvatarPlayground() {
  return (
    <>
      <Playground
        component="Avatar"
        importFrom="@/components/ui/atoms/Avatar"
        controls={[
          { type: 'text', prop: 'name', default: 'Laura Gómez' },
          { type: 'select', prop: 'size', options: sizes, default: 40 },
          { type: 'text', prop: 'initials', default: 'LG' },
          { type: 'boolean', prop: 'src', code: 'src="/fotos/laura.jpg"' },
          { type: 'boolean', prop: 'status' },
        ]}
        render={({ src, ...props }) => (
          <Avatar {...(props as React.ComponentProps<typeof Avatar>)} src={src ? sampleSrc : undefined} />
        )}
      />

      <Gallery>
        <Row label="initials">
          {sizes.map((size) => (
            <Avatar key={size} name="Laura Gómez" initials="LG" size={size} />
          ))}
        </Row>
        <Row label="image">
          {sizes.map((size) => (
            <Avatar key={size} name="Laura Gómez" src={sampleSrc} size={size} />
          ))}
        </Row>
        <Row label="placeholder">
          {sizes.map((size) => (
            <Avatar key={size} name="Laura Gómez" size={size} />
          ))}
        </Row>
        <Row label="con estado">
          {sizes.map((size) => (
            <Avatar key={size} name="Laura Gómez" initials="LG" size={size} status />
          ))}
        </Row>
      </Gallery>
    </>
  );
}
