'use client';

import { useState, useCallback } from 'react';
import type { Switch } from '@/domain/switch/types';

/**
 * 스위치 선택 상태 관리 훅
 */
export function useSwitchSelection(initialSwitch?: Switch | null) {
  const [selectedSwitch, setSelectedSwitch] = useState<Switch | null>(
    initialSwitch ?? null
  );

  const selectSwitch = useCallback((switchItem: Switch) => {
    setSelectedSwitch(switchItem);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedSwitch(null);
  }, []);

  return {
    selectedSwitch,
    selectSwitch,
    clearSelection,
  };
}
