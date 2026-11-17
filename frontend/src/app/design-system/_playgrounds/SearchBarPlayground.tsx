'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/ui/molecules/SearchBar';
import { Example, Gallery, Playground, Row } from '../_components/Playground';

// La vista guarda lo escrito: SearchBar es controlado
function SearchBarDemo(props: Omit<React.ComponentProps<typeof SearchBar>, 'value' | 'onValueChange'>) {
  const [value, setValue] = useState('');
  return <SearchBar {...props} value={value} onValueChange={setValue} className="w-full max-w-md" />;
}

export function SearchBarPlayground() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(false);

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
        render={(props) => (
          <SearchBarDemo
            {...(props as React.ComponentProps<typeof SearchBarDemo>)}
            onFiltersClick={props.onFiltersClick ? () => {} : undefined}
          />
        )}
        codeProps={['value={query}', 'onValueChange={setQuery}']}
      />
      <Example
        title="En uso"
        code={`const [query, setQuery] = useState('');

<SearchBar
  value={query}
  onValueChange={setQuery}
  label="Buscar movimientos"
  onFiltersClick={() => abrirFiltros()}
  filtersActive={hayFiltros}
  shortcut
/>`}
      >
        <SearchBar
          value={query}
          onValueChange={setQuery}
          label="Buscar movimientos"
          onFiltersClick={() => setFilters((value) => !value)}
          filtersActive={filters}
          shortcut
          className="w-full max-w-md"
        />
      </Example>

      <Gallery>
        <Row label="default" className="w-full max-w-sm">
          <SearchBar value="" onValueChange={() => {}} className="w-full" />
        </Row>
        <Row label="con texto" className="w-full max-w-sm">
          <SearchBar value="Mercado" onValueChange={() => {}} className="w-full" />
        </Row>
        <Row label="filtros activos" className="w-full max-w-sm">
          <SearchBar value="" onValueChange={() => {}} onFiltersClick={() => {}} filtersActive className="w-full" />
        </Row>
        <Row label="disabled" className="w-full max-w-sm">
          <SearchBar value="" onValueChange={() => {}} disabled className="w-full" />
        </Row>
      </Gallery>
    </>
  );
}
