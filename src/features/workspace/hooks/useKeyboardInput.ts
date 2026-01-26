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

    if (currentSwitch) {
      mapper.setCurrentSwitch(currentSwitch);
    }

    listener.onKeyDown((event: KeyEvent) => {
      // repeat 이벤트 무시
      if (event.repeat) return;

      const wasPressed = stateTracker.press(event.code);
      if (!wasPressed) return;

      const soundId = mapper.mapKeyToSound(event.code);
      onKeyPressRef.current?.(event.code, soundId);
    });

    listener.onKeyUp((event: KeyEvent) => {
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
