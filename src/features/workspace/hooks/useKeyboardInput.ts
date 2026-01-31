'use client';

import { useEffect, useRef } from 'react';
import { createKeyboardListener } from '@/domain/keyboard/KeyboardListener';
import { createKeyStateTracker } from '@/domain/keyboard/KeyStateTracker';
import { createKeyboardMapper } from '@/domain/keyboard/KeyboardMapper';
import type { KeyEvent } from '@/domain/keyboard/types';
import type { Switch } from '@/domain/switch/types';

interface UseKeyboardInputOptions {
  onKeyPress?: (keyCode: string, soundId: string | null) => void;
  onKeyRelease?: (keyCode: string) => void;
  currentSwitch?: Switch | null;
}

/**
 * 글로벌 키보드 입력 훅
 * 키보드 이벤트를 사운드 재생으로 연결
 */
export function useKeyboardInput({
  onKeyPress,
  onKeyRelease,
  currentSwitch,
}: UseKeyboardInputOptions) {
  // ref로 최신 콜백 참조 유지
  const onKeyPressRef = useRef(onKeyPress);
  const onKeyReleaseRef = useRef(onKeyRelease);

  useEffect(() => {
    onKeyPressRef.current = onKeyPress;
    onKeyReleaseRef.current = onKeyRelease;
  }, [onKeyPress, onKeyRelease]);

  useEffect(() => {
    const listener = createKeyboardListener();
    const stateTracker = createKeyStateTracker();
    const mapper = createKeyboardMapper();
    // macOS에서 Meta 키를 누르고 있으면 다른 키의 keyup이 발생하지 않음
    // Meta와 함께 눌린 키를 추적하여 Meta keyup 시 해제
    const metaPressedKeys = new Set<string>();

    if (currentSwitch) {
      mapper.setCurrentSwitch(currentSwitch);
    }

    listener.onKeyDown((event: KeyEvent) => {
      // repeat 이벤트 무시
      if (event.repeat) return;

      const wasPressed = stateTracker.press(event.code);
      if (!wasPressed) return;

      // Meta가 눌린 상태에서 함께 눌린 키 추적 (Meta 자체는 제외)
      if (event.metaKey && !event.code.startsWith('Meta')) {
        metaPressedKeys.add(event.code);
      }

      const soundId = mapper.mapKeyToSound(event.code);
      onKeyPressRef.current?.(event.code, soundId);
    });

    listener.onKeyUp((event: KeyEvent) => {
      // Meta keyup 시: Meta와 함께 눌렸던 키들의 keyup이 누락되었으므로 해제
      if (event.code.startsWith('Meta')) {
        for (const code of metaPressedKeys) {
          const wasReleased = stateTracker.release(code);
          if (wasReleased) {
            onKeyReleaseRef.current?.(code);
          }
        }
        metaPressedKeys.clear();
      }

      metaPressedKeys.delete(event.code);

      const wasReleased = stateTracker.release(event.code);
      if (!wasReleased) return;

      onKeyReleaseRef.current?.(event.code);
    });

    listener.start();

    return () => {
      listener.stop();
      stateTracker.reset();
    };
  }, [currentSwitch]);
}
