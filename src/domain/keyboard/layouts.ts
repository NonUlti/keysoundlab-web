/**
 * 키보드 OS 타입 (키 레이블 표시용)
 */
export type KeyboardOS = 'windows' | 'mac';

/**
 * Mac OS 키 레이블 오버라이드 맵 (code → Mac 레이블)
 */
export const macKeyLabels: Record<string, string> = {
  MetaLeft: '⌘',
  MetaRight: '⌘',
  AltLeft: '⌥',
  AltRight: '⌥',
  Backspace: '⌫',
  Enter: 'Return',
};

/**
 * OS에 따른 키 레이블 반환
 */
export function getKeyLabel(code: string, defaultLabel: string, os: KeyboardOS): string {
  if (os === 'mac' && code in macKeyLabels) {
    return macKeyLabels[code];
  }
  return defaultLabel;
}

/**
 * 키보드 레이아웃의 개별 키 정의
 */
export interface LayoutKey {
  code: string;
  label: string;
  width: number;
}

/**
 * 키보드 레이아웃의 행 정의
 */
export interface LayoutRow {
  id: string;
  keys: LayoutKey[];
}

/**
 * 키보드 레이아웃 정의
 */
export interface KeyboardLayout {
  id: string;
  name: string;
  description: string;
  totalKeys: number;
  rows: LayoutRow[];
}

/**
 * TKL (87-key) 레이아웃
 */
export const tklLayout: KeyboardLayout = {
  id: 'tkl',
  name: 'TKL (87-key)',
  description: '텐키리스 87키 레이아웃',
  totalKeys: 87,
  rows: [
    {
      id: 'function',
      keys: [
        { code: 'Escape', label: 'Esc', width: 1 },
        { code: '_gap', label: '', width: 1 },
        { code: 'F1', label: 'F1', width: 1 },
        { code: 'F2', label: 'F2', width: 1 },
        { code: 'F3', label: 'F3', width: 1 },
        { code: 'F4', label: 'F4', width: 1 },
        { code: '_gap', label: '', width: 0.5 },
        { code: 'F5', label: 'F5', width: 1 },
        { code: 'F6', label: 'F6', width: 1 },
        { code: 'F7', label: 'F7', width: 1 },
        { code: 'F8', label: 'F8', width: 1 },
        { code: '_gap', label: '', width: 0.5 },
        { code: 'F9', label: 'F9', width: 1 },
        { code: 'F10', label: 'F10', width: 1 },
        { code: 'F11', label: 'F11', width: 1 },
        { code: 'F12', label: 'F12', width: 1 },
        { code: '_gap', label: '', width: 0.25 },
        { code: 'PrintScreen', label: 'PrtSc', width: 1 },
        { code: 'ScrollLock', label: 'ScrLk', width: 1 },
        { code: 'Pause', label: 'Pause', width: 1 },
      ],
    },
    {
      id: 'number',
      keys: [
        { code: 'Backquote', label: '`', width: 1 },
        { code: 'Digit1', label: '1', width: 1 },
        { code: 'Digit2', label: '2', width: 1 },
        { code: 'Digit3', label: '3', width: 1 },
        { code: 'Digit4', label: '4', width: 1 },
        { code: 'Digit5', label: '5', width: 1 },
        { code: 'Digit6', label: '6', width: 1 },
        { code: 'Digit7', label: '7', width: 1 },
        { code: 'Digit8', label: '8', width: 1 },
        { code: 'Digit9', label: '9', width: 1 },
        { code: 'Digit0', label: '0', width: 1 },
        { code: 'Minus', label: '-', width: 1 },
        { code: 'Equal', label: '=', width: 1 },
        { code: 'Backspace', label: 'Back', width: 2 },
        { code: '_gap', label: '', width: 0.25 },
        { code: 'Insert', label: 'Ins', width: 1 },
        { code: 'Home', label: 'Home', width: 1 },
        { code: 'PageUp', label: 'PgUp', width: 1 },
      ],
    },
    {
      id: 'top',
      keys: [
        { code: 'Tab', label: 'Tab', width: 1.5 },
        { code: 'KeyQ', label: 'Q', width: 1 },
        { code: 'KeyW', label: 'W', width: 1 },
        { code: 'KeyE', label: 'E', width: 1 },
        { code: 'KeyR', label: 'R', width: 1 },
        { code: 'KeyT', label: 'T', width: 1 },
        { code: 'KeyY', label: 'Y', width: 1 },
        { code: 'KeyU', label: 'U', width: 1 },
        { code: 'KeyI', label: 'I', width: 1 },
        { code: 'KeyO', label: 'O', width: 1 },
        { code: 'KeyP', label: 'P', width: 1 },
        { code: 'BracketLeft', label: '[', width: 1 },
        { code: 'BracketRight', label: ']', width: 1 },
        { code: 'Backslash', label: '\\', width: 1.5 },
        { code: '_gap', label: '', width: 0.25 },
        { code: 'Delete', label: 'Del', width: 1 },
        { code: 'End', label: 'End', width: 1 },
        { code: 'PageDown', label: 'PgDn', width: 1 },
      ],
    },
    {
      id: 'home',
      keys: [
        { code: 'CapsLock', label: 'Caps', width: 1.75 },
        { code: 'KeyA', label: 'A', width: 1 },
        { code: 'KeyS', label: 'S', width: 1 },
        { code: 'KeyD', label: 'D', width: 1 },
        { code: 'KeyF', label: 'F', width: 1 },
        { code: 'KeyG', label: 'G', width: 1 },
        { code: 'KeyH', label: 'H', width: 1 },
        { code: 'KeyJ', label: 'J', width: 1 },
        { code: 'KeyK', label: 'K', width: 1 },
        { code: 'KeyL', label: 'L', width: 1 },
        { code: 'Semicolon', label: ';', width: 1 },
        { code: 'Quote', label: "'", width: 1 },
        { code: 'Enter', label: 'Enter', width: 2.25 },
      ],
    },
    {
      id: 'bottom',
      keys: [
        { code: 'ShiftLeft', label: 'Shift', width: 2.25 },
        { code: 'KeyZ', label: 'Z', width: 1 },
        { code: 'KeyX', label: 'X', width: 1 },
        { code: 'KeyC', label: 'C', width: 1 },
        { code: 'KeyV', label: 'V', width: 1 },
        { code: 'KeyB', label: 'B', width: 1 },
        { code: 'KeyN', label: 'N', width: 1 },
        { code: 'KeyM', label: 'M', width: 1 },
        { code: 'Comma', label: ',', width: 1 },
        { code: 'Period', label: '.', width: 1 },
        { code: 'Slash', label: '/', width: 1 },
        { code: 'ShiftRight', label: 'Shift', width: 2.75 },
        { code: '_gap', label: '', width: 1.25 },
        { code: 'ArrowUp', label: '\u2191', width: 1 },
      ],
    },
    {
      id: 'space',
      keys: [
        { code: 'ControlLeft', label: 'Ctrl', width: 1.25 },
        { code: 'MetaLeft', label: 'Win', width: 1.25 },
        { code: 'AltLeft', label: 'Alt', width: 1.25 },
        { code: 'Space', label: '', width: 6.25 },
        { code: 'AltRight', label: 'Alt', width: 1.25 },
        { code: 'MetaRight', label: 'Win', width: 1.25 },
        { code: 'ContextMenu', label: 'Fn', width: 1.25 },
        { code: 'ControlRight', label: 'Ctrl', width: 1.25 },
        { code: '_gap', label: '', width: 0.25 },
        { code: 'ArrowLeft', label: '\u2190', width: 1 },
        { code: 'ArrowDown', label: '\u2193', width: 1 },
        { code: 'ArrowRight', label: '\u2192', width: 1 },
      ],
    },
  ],
};
