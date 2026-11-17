'use client';

import { NotificationButton } from '@/components/ui/molecules/NotificationButton';
import { Gallery, Playground, Row } from '../_components/Playground';

export function NotificationButtonPlayground() {
  return (
    <>
      <Playground
        component="NotificationButton"
        importFrom="@/components/ui/molecules/NotificationButton"
        controls={[{ type: 'number', prop: 'count', default: 3 }]}
        render={(props) => <NotificationButton {...(props as React.ComponentProps<typeof NotificationButton>)} />}
      />

      <Gallery>
        <Row label="count" className="gap-8">
          <NotificationButton />
          <NotificationButton count={3} />
          <NotificationButton count={120} />
        </Row>
      </Gallery>
    </>
  );
}
