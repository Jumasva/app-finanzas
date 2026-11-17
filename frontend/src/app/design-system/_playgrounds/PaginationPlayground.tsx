'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { Pagination } from '@/components/ui/molecules/Pagination';
import { Gallery, Playground, Row } from '../_components/Playground';

// La vista guarda la página: Pagination es controlado
function PaginationDemo(props: Omit<React.ComponentProps<typeof Pagination>, 'onPageChange'>) {
  const [page, setPage] = useState(props.page);
  return <Pagination {...props} page={page} onPageChange={setPage} className="w-full" />;
}

export function PaginationPlayground() {
  return (
    <>
      <Playground
        component="Pagination"
        importFrom="@/components/ui/molecules/Pagination"
        controls={[
          { type: 'number', prop: 'page', default: 1 },
          { type: 'number', prop: 'pageSize', default: 20 },
          { type: 'number', prop: 'total', default: 248 },
          { type: 'text', prop: 'itemLabel', default: 'movimientos' },
        ]}
        codeProps={['onPageChange={setPage}']}
        render={(props) => <PaginationDemo {...(props as React.ComponentProps<typeof PaginationDemo>)} />}
      />

      <Gallery>
        <Row label="móvil · cargar más">
          <Button variant="secondary">Cargar más movimientos</Button>
        </Row>
      </Gallery>
    </>
  );
}
