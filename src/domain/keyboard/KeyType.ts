/**
 * 키보드 키 타입 분류
 * 실제 기계식 키보드에서 키 크기와 스태빌라이저 유무에 따라 소리가 다름
 */

export type KeyType =
  | 'default'      // 일반 키 (1u)
  | 'spacebar'     // 스페이스바 (6.25u, 큰 스태빌라이저)
  | 'enter'        // 엔터 키 (2.25u, 스태빌라이저)
  | 'shift'        // 시프트 키 (2.25u/2.75u, 스태빌라이저)
  | 'backspace'    // 백스페이스 (2u, 스태빌라이저)
  | 'stabilizer';  // 기타 스태빌라이저 키 (Tab, Caps, \, 등)

/**
 * 키 코드를 키 타입으로 분류
 */
export function getKeyType(keyCode: string): KeyType {
  // 스페이스바
  if (keyCode === 'Space') {
    return 'spacebar';
  }

  // 엔터
  if (keyCode === 'Enter') {
    return 'enter';
  }

  // 시프트
  if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
    return 'shift';
  }

  // 백스페이스
  if (keyCode === 'Backspace') {
    return 'backspace';
  }

  // 스태빌라이저가 있는 큰 키들
  if (
    keyCode === 'Tab' ||           // 1.5u
    keyCode === 'CapsLock' ||      // 1.75u
    keyCode === 'Backslash'        // 1.5u
  ) {
    return 'stabilizer';
  }

  // 나머지는 일반 키
  return 'default';
}

/**
 * 키 타입별 설명
 */
export const KEY_TYPE_DESCRIPTIONS: Record<KeyType, string> = {
  default: '일반 키 (1u)',
  spacebar: '스페이스바 (6.25u, 큰 스태빌라이저)',
  enter: '엔터 (2.25u, 스태빌라이저)',
  shift: '시프트 (2.25u/2.75u, 스태빌라이저)',
  backspace: '백스페이스 (2u, 스태빌라이저)',
  stabilizer: '기타 스태빌라이저 키',
};
