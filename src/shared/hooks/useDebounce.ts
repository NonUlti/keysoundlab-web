'use client';

import { useState, useEffect } from 'react';

/**
 * 디바운스 훅
 * 빠른 연속 입력을 지연시켜 불필요한 업데이트 방지
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
