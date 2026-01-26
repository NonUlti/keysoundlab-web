'use client';

import { useState, useEffect } from 'react';
import type { Switch, SwitchFilter } from '@/domain/switch/types';
import type { SwitchRepository } from '@/domain/switch/repository/SwitchRepository';

/**
 * 스위치 목록 데이터 페칭 훅
 */
export function useSwitchList(repository: SwitchRepository, filter?: SwitchFilter) {
  const [switches, setSwitches] = useState<Switch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSwitches = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = filter
          ? await repository.findByFilter(filter)
          : await repository.getAll();

        setSwitches(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load switches'));
      } finally {
        setLoading(false);
      }
    };

    loadSwitches();
  }, [repository, filter]);

  return { switches, loading, error };
}
