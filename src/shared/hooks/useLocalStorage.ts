'use client';

import { useState, useEffect } from 'react';
import { createLogger } from '../utils/logger';

const logger = createLogger('LocalStorage');

/**
 * LocalStorage 동기화 훅
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      logger.error(`Error loading localStorage key "${key}":`, error);
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      logger.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
