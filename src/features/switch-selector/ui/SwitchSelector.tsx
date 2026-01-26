'use client';

import { useState } from 'react';
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
  const [filter, setFilter] = useState<SwitchFilter>({});
  const { switches, loading, error } = useSwitchList(repository, filter);

  if (loading) {
    return <div className="loading">스위치 목록 로딩 중...</div>;
  }

  if (error) {
    return <div className="error">오류: {error.message}</div>;
  }

  return (
    <div className="switch-selector">
      <SwitchFilters onFilterChange={setFilter} />

      <div className="switch-list">
        {switches.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
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
