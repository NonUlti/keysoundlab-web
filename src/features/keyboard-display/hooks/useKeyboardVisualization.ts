'use client';

import { useState, useCallback } from 'react';

/**
 * 키보드 시각화 훅
 * 현재 눌린 키를 추적하여 시각적 피드백 제공
 */
export function useKeyboardVisualization() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const handleKeyPress = useCallback((keyCode: string) => {
    setPressedKeys((prev) => new Set(prev).add(keyCode));
  }, []);

  const handleKeyRelease = useCallback((keyCode: string) => {
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(keyCode);
      return next;
    });
  }, []);

  const isKeyPressed = useCallback((keyCode: string): boolean => {
    return pressedKeys.has(keyCode);
  }, [pressedKeys]);

  const clearAll = useCallback(() => {
    setPressedKeys(new Set());
  }, []);

  return {
    pressedKeys: Array.from(pressedKeys),
    handleKeyPress,
    handleKeyRelease,
    isKeyPressed,
    clearAll,
  };
}
