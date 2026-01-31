/**
 * 키보드 이벤트 타입
 */
export interface KeyEvent {
  code: string;
  key: string;
  timestamp: number;
  repeat: boolean;
  metaKey: boolean;
}

/**
 * 키 상태
 */
export interface KeyState {
  code: string;
  isPressed: boolean;
  pressedAt?: number;
}

/**
 * 키보드 매핑 설정
 */
export interface KeyboardMapping {
  [keyCode: string]: string; // keyCode -> soundId
}
