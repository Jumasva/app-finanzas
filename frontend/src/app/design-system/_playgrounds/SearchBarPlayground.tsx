'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/ui/molecules/SearchBar';
import { Example, Gallery, Row } from '../_components/Playground';

export function SearchBarPlayground() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(false);

  return (
    <>
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
