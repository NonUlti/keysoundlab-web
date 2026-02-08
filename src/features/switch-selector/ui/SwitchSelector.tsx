'use client';

import { useState, useEffect } from 'react';
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
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const { switches, loading, error } = useSwitchList(repository, filter);

  useEffect(() => {
    repository.getManufacturers().then(setManufacturers).catch(() => {});
  }, [repository]);

  if (loading && switches.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-text-primary">{t('switch.title')}</h2>
        <p className="text-xs text-text-secondary">{t('switch.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-text-primary">{t('switch.title')}</h2>
        <p className="text-xs text-[rgb(var(--error-rgb))]">{t('switch.error')} {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-text-primary">{t('switch.title')}</h2>

      <SwitchFilters onFilterChange={setFilter} manufacturers={manufacturers} />

      <p className="text-xs text-text-secondary">
        {t('filter.resultCount', { count: switches.length })}
      </p>

      <ul className="flex flex-col gap-1.5" aria-label={t('switch.title')}>
        {switches.length === 0 ? (
          <li className="py-4 text-center text-xs text-text-secondary">
            {t('switch.noResults')}
          </li>
        ) : (
          switches.map((switchItem) => (
            <li key={switchItem.id}>
              <SwitchCard
                switch={switchItem}
                selected={selectedSwitch?.id === switchItem.id}
                onSelect={onSelectSwitch}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
