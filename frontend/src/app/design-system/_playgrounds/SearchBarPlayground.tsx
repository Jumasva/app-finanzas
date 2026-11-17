'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/ui/molecules/SearchBar';
import { Gallery, Playground, Row } from '../_components/Playground';

// La vista guarda lo escrito: SearchBar es controlado
function SearchBarDemo(props: Omit<React.ComponentProps<typeof SearchBar>, 'value' | 'onValueChange'>) {
  const [value, setValue] = useState('');
  return <SearchBar {...props} value={value} onValueChange={setValue} className="w-full max-w-md" />;
}

export function SearchBarPlayground() {
  return (
    <>
      <Playground
        component="SearchBar"
        importFrom="@/components/ui/molecules/SearchBar"
        controls={[
          { type: 'text', prop: 'label', default: 'Buscar movimientos' },
          { type: 'text', prop: 'placeholder', default: 'Buscar movimientos' },
          { type: 'select', prop: 'size', options: ['md', 'lg'], default: 'md' },
          { type: 'boolean', prop: 'onFiltersClick', code: 'onFiltersClick={() => …}' },
          { type: 'boolean', prop: 'filtersActive' },
          { type: 'boolean', prop: 'shortcut' },
          { type: 'boolean', prop: 'disabled' },
        ]}
        codeProps={['value={query}', 'onValueChange={setQuery}']}
        render={(props) => (
          <SearchBarDemo
            {...(props as React.ComponentProps<typeof SearchBarDemo>)}
            onFiltersClick={props.onFiltersClick ? () => {} : undefined}
          />
        )}
      />

      <Gallery>
        <Row label="con texto · limpiar" className="w-full max-w-sm">
          <SearchBar value="Mercado" onValueChange={() => {}} className="w-full" />
        </Row>
        <Row label="filtros activos" className="w-full max-w-sm">
          <SearchBar value="" onValueChange={() => {}} onFiltersClick={() => {}} filtersActive className="w-full" />
        </Row>
      </Gallery>
    </>
  );
}
