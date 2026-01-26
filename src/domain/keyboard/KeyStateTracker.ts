import type { KeyState } from './types';

/**
 * 키 상태 추적기 인터페이스
 */
export interface KeyStateTracker {
  press: (code: string) => boolean;
  release: (code: string) => boolean;
  isPressed: (code: string) => boolean;
  getPressedAt: (code: string) => number | undefined;
  getPressedDuration: (code: string) => number;
  reset: () => void;
  getPressedKeys: () => string[];
}

/**
 * 키 상태 추적기 생성
 */
export const createKeyStateTracker = (): KeyStateTracker => {
  const states = new Map<string, KeyState>();

  return {
    press(code) {
      const state = states.get(code);

      // 이미 눌려있으면 false 반환 (repeat 방지)
      if (state?.isPressed) {
        return false;
      }

      states.set(code, {
        code,
        isPressed: true,
        pressedAt: Date.now(),
      });

      return true;
    },

    release(code) {
      const state = states.get(code);

      // 눌려있지 않으면 false 반환
      if (!state?.isPressed) {
        return false;
      }

      states.set(code, {
        code,
        isPressed: false,
      });

      return true;
    },

    isPressed(code) {
      return states.get(code)?.isPressed ?? false;
    },

    getPressedAt(code) {
      return states.get(code)?.pressedAt;
    },

    getPressedDuration(code) {
      const pressedAt = states.get(code)?.pressedAt;
      if (!pressedAt) return 0;

      return Date.now() - pressedAt;
    },

    reset() {
      states.clear();
    },

    getPressedKeys() {
      return Array.from(states.entries())
        .filter(([_, state]) => state.isPressed)
        .map(([code]) => code);
    },
  };
};
