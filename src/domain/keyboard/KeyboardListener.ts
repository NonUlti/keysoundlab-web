import type { KeyEvent } from './types';

/**
 * 키보드 리스너 인터페이스
 */
export interface KeyboardListener {
  start: () => void;
  stop: () => void;
  onKeyDown: (callback: (event: KeyEvent) => void) => void;
  onKeyUp: (callback: (event: KeyEvent) => void) => void;
  isActive: () => boolean;
}

/**
 * 키보드 리스너 생성
 */
export const createKeyboardListener = (): KeyboardListener => {
  let onKeyDownCallback: ((event: KeyEvent) => void) | undefined;
  let onKeyUpCallback: ((event: KeyEvent) => void) | undefined;
  let isListening = false;

  const isInteractiveFormElement = (): boolean => {
    const el = document.activeElement;
    if (!el || !(el instanceof HTMLElement)) {
      return false;
    }

    const tagName = el.tagName.toLowerCase();
    return (
      tagName === 'input' ||
      tagName === 'textarea' ||
      tagName === 'select' ||
      el.isContentEditable
    );
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (isInteractiveFormElement()) {
      return;
    }

    e.preventDefault();

    if (onKeyDownCallback) {
      onKeyDownCallback({
        code: e.code,
        key: e.key,
        timestamp: Date.now(),
        repeat: e.repeat,
        metaKey: e.metaKey,
      });
    }
  };

  const handleKeyUp = (e: KeyboardEvent): void => {
    if (isInteractiveFormElement()) {
      return;
    }

    e.preventDefault();

    if (onKeyUpCallback) {
      onKeyUpCallback({
        code: e.code,
        key: e.key,
        timestamp: Date.now(),
        repeat: false,
        metaKey: e.metaKey,
      });
    }
  };

  return {
    start() {
      if (isListening) return;

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      isListening = true;
    },

    stop() {
      if (!isListening) return;

      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      isListening = false;
    },

    onKeyDown(callback) {
      onKeyDownCallback = callback;
    },

    onKeyUp(callback) {
      onKeyUpCallback = callback;
    },

    isActive() {
      return isListening;
    },
  };
};
