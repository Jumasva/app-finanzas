'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { Pagination } from '@/components/ui/molecules/Pagination';
import { Example, Gallery, Playground, Row } from '../_components/Playground';

function PaginationDemo(props: Omit<React.ComponentProps<typeof Pagination>, 'onPageChange'>) {
  const [page, setPage] = useState(props.page);
  return <Pagination {...props} page={page} onPageChange={setPage} className="w-full" />;
}

export function PaginationPlayground() {
  const [page, setPage] = useState(1);

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
        render={(props) => <PaginationDemo {...(props as React.ComponentProps<typeof PaginationDemo>)} />}
        codeProps={['onPageChange={setPage}']}
      />
      <Example
        title="En uso (en móvil solo anterior y siguiente)"
        code={`<Pagination page={page} pageSize={20} total={248} onPageChange={setPage} itemLabel="movimientos" />`}
      >
        <Pagination
          page={page}
          pageSize={20}
          total={248}
          onPageChange={setPage}
          itemLabel="movimientos"
          className="w-full"
        />
      </Example>

      <Gallery>
        <Row label="pocas páginas" className="w-full">
          <Pagination page={2} pageSize={20} total={90} onPageChange={() => {}} className="w-full" />
        </Row>
        <Row label="al medio" className="w-full">
          <Pagination page={7} pageSize={20} total={248} onPageChange={() => {}} className="w-full" />
        </Row>
        <Row label="móvil · cargar más">
          <Button variant="secondary">Cargar más movimientos</Button>
        </Row>
      </Gallery>
    </>
  );
}
