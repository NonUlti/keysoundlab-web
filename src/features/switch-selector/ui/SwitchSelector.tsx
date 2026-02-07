'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { NAMESPACES } from '@/i18n/constants';
import type { Switch, SwitchFilter } from '@/domain/switch/types';
import type { SwitchRepository } from '@/domain/switch/repository/SwitchRepository';
import { SwitchCard } from './SwitchCard';
import { SwitchFilters } from './SwitchFilters';
import { useSwitchList } from '../hooks/useSwitchList';

interface SwitchSelectorProps {
  repository: SwitchRepository;
  selectedSwitch: Switch | null;
  onSelectSwitch: (switchItem: Switch) => void;
}

/**
 * 스위치 선택 메인 컴포넌트
 */
export function SwitchSelector({
  repository,
  selectedSwitch,
  onSelectSwitch,
}: SwitchSelectorProps) {
  const t = useTranslations(NAMESPACES.SOUND_TEST);
  const [filter, setFilter] = useState<SwitchFilter>({});
  const { switches, loading, error } = useSwitchList(repository, filter);

  if (loading) {
    return <div>{t('switch.loading')}</div>;
  }

  if (error) {
    return <div>{t('switch.error')} {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <SwitchFilters onFilterChange={setFilter} />

      <div className="flex flex-col gap-1.5">
        {switches.length === 0 ? (
          <p>{t('switch.noResults')}</p>
        ) : (
          switches.map((switchItem) => (
            <SwitchCard
              key={switchItem.id}
              switch={switchItem}
              selected={selectedSwitch?.id === switchItem.id}
              onSelect={onSelectSwitch}
            />
          ))
        )}
      </div>
    </div>
  );
}
