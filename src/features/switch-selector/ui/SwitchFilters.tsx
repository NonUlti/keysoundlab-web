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
    <div className="switch-filters">
      <input
        type="text"
        placeholder={t('filter.search')}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleFilterChange();
        }}
      />

      <select
        value={selectedType ?? ''}
        onChange={(e) => {
          setSelectedType(e.target.value as SwitchType || undefined);
          handleFilterChange();
        }}
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
