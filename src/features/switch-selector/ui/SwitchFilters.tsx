'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { NAMESPACES } from '@/i18n/constants';
import type { SwitchFilter, SwitchType } from '@/domain/switch/types';

interface SwitchFiltersProps {
  onFilterChange: (filter: SwitchFilter) => void;
  manufacturers?: string[];
}

/**
 * 스위치 필터/검색 UI
 */
export function SwitchFilters({ onFilterChange, manufacturers = [] }: SwitchFiltersProps) {
  const t = useTranslations(NAMESPACES.SOUND_TEST);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedType, setSelectedType] = useState<SwitchType | undefined>();
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | undefined>();

  // Debounce search query (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync filter to parent — useEffect로 stale state 버그 해결
  useEffect(() => {
    onFilterChange({
      searchQuery: debouncedQuery || undefined,
      type: selectedType,
      manufacturer: selectedManufacturer,
    });
  }, [debouncedQuery, selectedType, selectedManufacturer, onFilterChange]);

  const hasActiveFilter = !!(searchQuery || selectedType || selectedManufacturer);

  const handleReset = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    setSelectedType(undefined);
    setSelectedManufacturer(undefined);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <input
          type="text"
          placeholder={t('filter.search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 px-2.5 pr-7 bg-primary border border-border rounded text-text-primary text-xs placeholder:text-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary text-sm leading-none"
            aria-label={t('filter.clearSearch')}
          >
            &times;
          </button>
        )}
      </div>

      <div className="flex gap-1.5">
        <select
          value={selectedType ?? ''}
          onChange={(e) => setSelectedType((e.target.value as SwitchType) || undefined)}
          className="flex-1 min-w-0 py-2 px-2 bg-primary border border-border rounded text-text-primary text-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <option value="">{t('filter.allTypes')}</option>
          <option value="linear">{t('filter.linear')}</option>
          <option value="tactile">{t('filter.tactile')}</option>
          <option value="clicky">{t('filter.clicky')}</option>
        </select>

        <select
          value={selectedManufacturer ?? ''}
          onChange={(e) => setSelectedManufacturer(e.target.value || undefined)}
          className="flex-1 min-w-0 py-2 px-2 bg-primary border border-border rounded text-text-primary text-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <option value="">{t('filter.allManufacturers')}</option>
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer} value={manufacturer}>
              {manufacturer}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilter && (
        <button
          type="button"
          onClick={handleReset}
          className="self-start py-1 px-2 text-xs text-text-secondary hover:text-text-primary transition-colors"
        >
          {t('filter.reset')}
        </button>
      )}
    </div>
  );
}
