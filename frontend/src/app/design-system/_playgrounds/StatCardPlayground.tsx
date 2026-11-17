'use client';

import { CategoryIcon } from '@/components/ui/atoms/CategoryIcon';
import { ArrowDownRightIcon, ArrowUpRightIcon, TargetIcon, WalletIcon } from '@/components/ui/atoms/icons';
import { StatCard } from '@/components/ui/molecules/StatCard';
import { Gallery, Playground } from '../_components/Playground';

export function StatCardPlayground() {
  return (
    <>
      <Playground
        component="StatCard"
        importFrom="@/components/ui/molecules/StatCard"
        controls={[
          { type: 'text', prop: 'label', default: 'Gastos' },
          { type: 'number', prop: 'value', default: 2180400 },
        ]}
        codeProps={["delta={{ percent: 8, tone: 'bad', caption: 'vs. septiembre' }}"]}
        render={(props) => (
          <StatCard
            {...(props as React.ComponentProps<typeof StatCard>)}
            delta={{ percent: 8, tone: 'bad', caption: 'vs. septiembre' }}
            className="w-64"
          />
        )}
      />

      <Gallery title="Fila del panel">
        <div className="grid w-full gap-4 py-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Ingresos"
            value={4250000}
            icon={<CategoryIcon icon={ArrowUpRightIcon} color="green" size={32} shape="square" />}
            delta={{ percent: 12, tone: 'good', caption: 'vs. septiembre' }}
          />
          <StatCard
            label="Gastos"
            value={2180400}
            icon={<CategoryIcon icon={ArrowDownRightIcon} color="red" size={32} shape="square" />}
            delta={{ percent: 8, tone: 'bad', caption: 'vs. septiembre' }}
          />
          <StatCard
            label="Ahorro"
            value={2069600}
            icon={<CategoryIcon icon={TargetIcon} color="emerald" size={32} shape="square" />}
            delta={{ percent: 15, tone: 'good', caption: 'vs. septiembre' }}
          />
          <StatCard
            label="Deudas"
            value={850000}
            icon={<CategoryIcon icon={WalletIcon} color="indigo" size={32} shape="square" />}
            delta={{ percent: -5, tone: 'good', caption: 'vs. septiembre' }}
          />
        </div>
      </Gallery>
    </>
  );
}
