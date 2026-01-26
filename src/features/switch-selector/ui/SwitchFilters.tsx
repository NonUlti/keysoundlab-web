'use client';

import { useState } from 'react';
import type { SwitchFilter, SwitchType } from '@/domain/switch/types';

interface SwitchFiltersProps {
  onFilterChange: (filter: SwitchFilter) => void;
  manufacturers?: string[];
}

/**
 * 스위치 필터/검색 UI
 */
export function SwitchFilters({ onFilterChange, manufacturers = [] }: SwitchFiltersProps) {
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
        placeholder="스위치 검색..."
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
        <option value="">모든 타입</option>
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
        <option value="">모든 제조사</option>
        {manufacturers.map((manufacturer) => (
          <option key={manufacturer} value={manufacturer}>
            {manufacturer}
          </option>
        ))}
      </select>
    </div>
  );
}
