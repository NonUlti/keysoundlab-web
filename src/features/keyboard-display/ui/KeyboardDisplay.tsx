'use client';

import { Key } from './Key';
import { getKeyLabel } from '@/domain/keyboard';
import type { KeyboardOS } from '@/domain/keyboard';

interface KeyboardDisplayProps {
  pressedKeys: string[];
  onKeyMouseDown?: (code: string) => void;
  onKeyMouseUp?: (code: string) => void;
  os?: KeyboardOS;
}

/**
 * 시각적 키보드 레이아웃
 * 87키 텐키리스(TKL) 레이아웃
 */
export function KeyboardDisplay({ pressedKeys, onKeyMouseDown, onKeyMouseUp, os = 'windows' }: KeyboardDisplayProps) {
  const isPressed = (code: string) => pressedKeys.includes(code);
  const label = (code: string, defaultLabel: string) => getKeyLabel(code, defaultLabel, os);

  return (
    <div className="keyboard-display mx-auto p-3 md:p-4 bg-secondary rounded-xl border border-border w-fit" role="img" aria-label="Keyboard visualization">
      {/* Function 키 행 */}
      <div className="flex flex-col gap-[var(--row-gap)]">
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="Escape" label="Esc" width={1} isPressed={isPressed('Escape')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
          <div className="fn-group flex gap-[var(--key-gap)]">
            <Key code="F1" label="F1" width={1} isPressed={isPressed('F1')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="F2" label="F2" width={1} isPressed={isPressed('F2')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="F3" label="F3" width={1} isPressed={isPressed('F3')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="F4" label="F4" width={1} isPressed={isPressed('F4')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
          <div className="fn-group flex gap-[var(--key-gap)]">
            <Key code="F5" label="F5" width={1} isPressed={isPressed('F5')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="F6" label="F6" width={1} isPressed={isPressed('F6')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="F7" label="F7" width={1} isPressed={isPressed('F7')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="F8" label="F8" width={1} isPressed={isPressed('F8')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
          <div className="fn-group flex gap-[var(--key-gap)]">
            <Key code="F9" label="F9" width={1} isPressed={isPressed('F9')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="F10" label="F10" width={1} isPressed={isPressed('F10')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="F11" label="F11" width={1} isPressed={isPressed('F11')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="F12" label="F12" width={1} isPressed={isPressed('F12')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
          <div className="flex gap-[var(--key-gap)] ml-[var(--section-gap)]">
            <Key code="PrintScreen" label="PrtSc" width={1} isPressed={isPressed('PrintScreen')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="ScrollLock" label="ScrLk" width={1} isPressed={isPressed('ScrollLock')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Pause" label="Pause" width={1} isPressed={isPressed('Pause')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
        </div>
      </div>

      <div className="keyboard-gap-vertical" />

      {/* 메인 키보드 섹션 */}
      <div className="flex flex-col gap-[var(--row-gap)]">
        {/* 숫자 행 */}
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="Backquote" label="`" width={1} isPressed={isPressed('Backquote')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Digit1" label="1" width={1} isPressed={isPressed('Digit1')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Digit2" label="2" width={1} isPressed={isPressed('Digit2')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Digit3" label="3" width={1} isPressed={isPressed('Digit3')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Digit4" label="4" width={1} isPressed={isPressed('Digit4')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Digit5" label="5" width={1} isPressed={isPressed('Digit5')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Digit6" label="6" width={1} isPressed={isPressed('Digit6')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Digit7" label="7" width={1} isPressed={isPressed('Digit7')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Digit8" label="8" width={1} isPressed={isPressed('Digit8')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Digit9" label="9" width={1} isPressed={isPressed('Digit9')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Digit0" label="0" width={1} isPressed={isPressed('Digit0')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Minus" label="-" width={1} isPressed={isPressed('Minus')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Equal" label="=" width={1} isPressed={isPressed('Equal')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Backspace" label={label('Backspace', 'Back')} width={2} isPressed={isPressed('Backspace')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
          <div className="flex gap-[var(--key-gap)] ml-[var(--section-gap)]">
            <Key code="Insert" label="Ins" width={1} isPressed={isPressed('Insert')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Home" label="Home" width={1} isPressed={isPressed('Home')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="PageUp" label="PgUp" width={1} isPressed={isPressed('PageUp')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
        </div>

        {/* Tab 행 */}
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="Tab" label="Tab" width={1.5} isPressed={isPressed('Tab')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyQ" label="Q" width={1} isPressed={isPressed('KeyQ')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyW" label="W" width={1} isPressed={isPressed('KeyW')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyE" label="E" width={1} isPressed={isPressed('KeyE')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyR" label="R" width={1} isPressed={isPressed('KeyR')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyT" label="T" width={1} isPressed={isPressed('KeyT')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyY" label="Y" width={1} isPressed={isPressed('KeyY')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyU" label="U" width={1} isPressed={isPressed('KeyU')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyI" label="I" width={1} isPressed={isPressed('KeyI')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyO" label="O" width={1} isPressed={isPressed('KeyO')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyP" label="P" width={1} isPressed={isPressed('KeyP')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="BracketLeft" label="[" width={1} isPressed={isPressed('BracketLeft')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="BracketRight" label="]" width={1} isPressed={isPressed('BracketRight')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Backslash" label="\" width={1.5} isPressed={isPressed('Backslash')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
          <div className="flex gap-[var(--key-gap)] ml-[var(--section-gap)]">
            <Key code="Delete" label={label('Delete', 'Del')} width={1} isPressed={isPressed('Delete')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="End" label="End" width={1} isPressed={isPressed('End')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="PageDown" label="PgDn" width={1} isPressed={isPressed('PageDown')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
        </div>

        {/* Caps 행 */}
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="CapsLock" label="Caps" width={1.75} isPressed={isPressed('CapsLock')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyA" label="A" width={1} isPressed={isPressed('KeyA')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyS" label="S" width={1} isPressed={isPressed('KeyS')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyD" label="D" width={1} isPressed={isPressed('KeyD')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyF" label="F" width={1} isPressed={isPressed('KeyF')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyG" label="G" width={1} isPressed={isPressed('KeyG')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyH" label="H" width={1} isPressed={isPressed('KeyH')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyJ" label="J" width={1} isPressed={isPressed('KeyJ')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyK" label="K" width={1} isPressed={isPressed('KeyK')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyL" label="L" width={1} isPressed={isPressed('KeyL')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Semicolon" label=";" width={1} isPressed={isPressed('Semicolon')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Quote" label="'" width={1} isPressed={isPressed('Quote')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Enter" label={label('Enter', 'Enter')} width={2.25} isPressed={isPressed('Enter')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
          <div className="nav-empty" />
        </div>

        {/* Shift 행 */}
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="ShiftLeft" label="Shift" width={2.25} isPressed={isPressed('ShiftLeft')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyZ" label="Z" width={1} isPressed={isPressed('KeyZ')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyX" label="X" width={1} isPressed={isPressed('KeyX')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyC" label="C" width={1} isPressed={isPressed('KeyC')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyV" label="V" width={1} isPressed={isPressed('KeyV')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyB" label="B" width={1} isPressed={isPressed('KeyB')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyN" label="N" width={1} isPressed={isPressed('KeyN')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="KeyM" label="M" width={1} isPressed={isPressed('KeyM')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Comma" label="," width={1} isPressed={isPressed('Comma')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Period" label="." width={1} isPressed={isPressed('Period')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="Slash" label="/" width={1} isPressed={isPressed('Slash')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="ShiftRight" label="Shift" width={2.75} isPressed={isPressed('ShiftRight')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
          <div className="flex gap-[var(--key-gap)] ml-[var(--section-gap)]">
            <div className="arrow-spacer" />
            <Key code="ArrowUp" label="↑" width={1} isPressed={isPressed('ArrowUp')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <div className="arrow-spacer" />
          </div>
        </div>

        {/* Ctrl 행 */}
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="ControlLeft" label="Ctrl" width={1.25} isPressed={isPressed('ControlLeft')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            {os === 'mac' ? (
              <>
                <Key code="AltLeft" label={label('AltLeft', 'Alt')} width={1.25} isPressed={isPressed('AltLeft')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
                <Key code="MetaLeft" label={label('MetaLeft', 'Win')} width={1.25} isPressed={isPressed('MetaLeft')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
              </>
            ) : (
              <>
                <Key code="MetaLeft" label={label('MetaLeft', 'Win')} width={1.25} isPressed={isPressed('MetaLeft')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
                <Key code="AltLeft" label={label('AltLeft', 'Alt')} width={1.25} isPressed={isPressed('AltLeft')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
              </>
            )}
            <Key code="Space" label="" width={6.25} isPressed={isPressed('Space')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            {os === 'mac' ? (
              <>
                <Key code="MetaRight" label={label('MetaRight', 'Win')} width={1.25} isPressed={isPressed('MetaRight')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
                <Key code="AltRight" label={label('AltRight', 'Alt')} width={1.25} isPressed={isPressed('AltRight')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
              </>
            ) : (
              <>
                <Key code="AltRight" label={label('AltRight', 'Alt')} width={1.25} isPressed={isPressed('AltRight')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
                <Key code="MetaRight" label={label('MetaRight', 'Win')} width={1.25} isPressed={isPressed('MetaRight')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
              </>
            )}
            <Key code="ContextMenu" label="Fn" width={1.25} isPressed={isPressed('ContextMenu')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="ControlRight" label="Ctrl" width={1.25} isPressed={isPressed('ControlRight')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
          <div className="flex gap-[var(--key-gap)] ml-[var(--section-gap)]">
            <Key code="ArrowLeft" label="←" width={1} isPressed={isPressed('ArrowLeft')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="ArrowDown" label="↓" width={1} isPressed={isPressed('ArrowDown')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
            <Key code="ArrowRight" label="→" width={1} isPressed={isPressed('ArrowRight')} onMouseDown={onKeyMouseDown} onMouseUp={onKeyMouseUp} />
          </div>
        </div>
      </div>
    </div>
  );
}
