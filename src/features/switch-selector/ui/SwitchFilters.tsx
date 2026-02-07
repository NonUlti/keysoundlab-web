'use client';

import { useState } from 'react';
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
  const [selectedType, setSelectedType] = useState<SwitchType | undefined>();
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | undefined>();

  const handleFilterChange = () => {
    const filter: SwitchFilter = {
      searchQuery: searchQuery || undefined,
      type: selectedType,
      manufacturer: selectedManufacturer,
    };
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-col gap-2 mb-3">
      <input
        type="text"
        placeholder={t('filter.search')}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleFilterChange();
        }}
        className="w-full py-1.5 px-2 bg-primary border border-border rounded text-text-primary text-xs placeholder:text-text-secondary focus:outline-none focus:border-accent"
      />

      <select
        value={selectedType ?? ''}
        onChange={(e) => {
          setSelectedType(e.target.value as SwitchType || undefined);
          handleFilterChange();
        }}
        className="w-full py-1.5 px-2 bg-primary border border-border rounded text-text-primary text-xs cursor-pointer focus:outline-none focus:border-accent"
      >
        <option value="">{t('filter.allTypes')}</option>
        <option value="linear">Linear</option>
        <option value="tactile">Tactile</option>
        <option value="clicky">Clicky</option>
      </select>

      <select
        value={selectedManufacturer ?? ''}
        onChange={(e) => {
          setSelectedManufacturer(e.target.value || undefined);
          handleFilterChange();
        }}
        className="w-full py-1.5 px-2 bg-primary border border-border rounded text-text-primary text-xs cursor-pointer focus:outline-none focus:border-accent"
      >
        <option value="">{t('filter.allManufacturers')}</option>
        {manufacturers.map((manufacturer) => (
          <option key={manufacturer} value={manufacturer}>
            {manufacturer}
          </option>
        ))}
      </select>
    </div>
  );
}
