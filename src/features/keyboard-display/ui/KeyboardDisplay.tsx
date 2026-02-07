'use client';

import { Key } from './Key';

interface KeyboardDisplayProps {
  pressedKeys: string[];
}

/**
 * 시각적 키보드 레이아웃
 * 87키 텐키리스(TKL) 레이아웃
 */
export function KeyboardDisplay({ pressedKeys }: KeyboardDisplayProps) {
  const isPressed = (code: string) => pressedKeys.includes(code);

  return (
    <div className="keyboard-display mx-auto p-4 bg-secondary rounded-xl border border-border w-fit">
      {/* Function 키 행 */}
      <div className="flex flex-col gap-[var(--row-gap)]">
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="Escape" label="Esc" width={1} isPressed={isPressed('Escape')} />
          </div>
          <div className="fn-group flex gap-[var(--key-gap)]">
            <Key code="F1" label="F1" width={1} isPressed={isPressed('F1')} />
            <Key code="F2" label="F2" width={1} isPressed={isPressed('F2')} />
            <Key code="F3" label="F3" width={1} isPressed={isPressed('F3')} />
            <Key code="F4" label="F4" width={1} isPressed={isPressed('F4')} />
          </div>
          <div className="fn-group flex gap-[var(--key-gap)]">
            <Key code="F5" label="F5" width={1} isPressed={isPressed('F5')} />
            <Key code="F6" label="F6" width={1} isPressed={isPressed('F6')} />
            <Key code="F7" label="F7" width={1} isPressed={isPressed('F7')} />
            <Key code="F8" label="F8" width={1} isPressed={isPressed('F8')} />
          </div>
          <div className="fn-group flex gap-[var(--key-gap)]">
            <Key code="F9" label="F9" width={1} isPressed={isPressed('F9')} />
            <Key code="F10" label="F10" width={1} isPressed={isPressed('F10')} />
            <Key code="F11" label="F11" width={1} isPressed={isPressed('F11')} />
            <Key code="F12" label="F12" width={1} isPressed={isPressed('F12')} />
          </div>
          <div className="flex gap-[var(--key-gap)] ml-[var(--section-gap)]">
            <Key code="PrintScreen" label="PrtSc" width={1} isPressed={isPressed('PrintScreen')} />
            <Key code="ScrollLock" label="ScrLk" width={1} isPressed={isPressed('ScrollLock')} />
            <Key code="Pause" label="Pause" width={1} isPressed={isPressed('Pause')} />
          </div>
        </div>
      </div>

      <div className="keyboard-gap-vertical" />

      {/* 메인 키보드 섹션 */}
      <div className="flex flex-col gap-[var(--row-gap)]">
        {/* 숫자 행 */}
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="Backquote" label="`" width={1} isPressed={isPressed('Backquote')} />
            <Key code="Digit1" label="1" width={1} isPressed={isPressed('Digit1')} />
            <Key code="Digit2" label="2" width={1} isPressed={isPressed('Digit2')} />
            <Key code="Digit3" label="3" width={1} isPressed={isPressed('Digit3')} />
            <Key code="Digit4" label="4" width={1} isPressed={isPressed('Digit4')} />
            <Key code="Digit5" label="5" width={1} isPressed={isPressed('Digit5')} />
            <Key code="Digit6" label="6" width={1} isPressed={isPressed('Digit6')} />
            <Key code="Digit7" label="7" width={1} isPressed={isPressed('Digit7')} />
            <Key code="Digit8" label="8" width={1} isPressed={isPressed('Digit8')} />
            <Key code="Digit9" label="9" width={1} isPressed={isPressed('Digit9')} />
            <Key code="Digit0" label="0" width={1} isPressed={isPressed('Digit0')} />
            <Key code="Minus" label="-" width={1} isPressed={isPressed('Minus')} />
            <Key code="Equal" label="=" width={1} isPressed={isPressed('Equal')} />
            <Key code="Backspace" label="Back" width={2} isPressed={isPressed('Backspace')} />
          </div>
          <div className="flex gap-[var(--key-gap)] ml-[var(--section-gap)]">
            <Key code="Insert" label="Ins" width={1} isPressed={isPressed('Insert')} />
            <Key code="Home" label="Home" width={1} isPressed={isPressed('Home')} />
            <Key code="PageUp" label="PgUp" width={1} isPressed={isPressed('PageUp')} />
          </div>
        </div>

        {/* Tab 행 */}
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="Tab" label="Tab" width={1.5} isPressed={isPressed('Tab')} />
            <Key code="KeyQ" label="Q" width={1} isPressed={isPressed('KeyQ')} />
            <Key code="KeyW" label="W" width={1} isPressed={isPressed('KeyW')} />
            <Key code="KeyE" label="E" width={1} isPressed={isPressed('KeyE')} />
            <Key code="KeyR" label="R" width={1} isPressed={isPressed('KeyR')} />
            <Key code="KeyT" label="T" width={1} isPressed={isPressed('KeyT')} />
            <Key code="KeyY" label="Y" width={1} isPressed={isPressed('KeyY')} />
            <Key code="KeyU" label="U" width={1} isPressed={isPressed('KeyU')} />
            <Key code="KeyI" label="I" width={1} isPressed={isPressed('KeyI')} />
            <Key code="KeyO" label="O" width={1} isPressed={isPressed('KeyO')} />
            <Key code="KeyP" label="P" width={1} isPressed={isPressed('KeyP')} />
            <Key code="BracketLeft" label="[" width={1} isPressed={isPressed('BracketLeft')} />
            <Key code="BracketRight" label="]" width={1} isPressed={isPressed('BracketRight')} />
            <Key code="Backslash" label="\" width={1.5} isPressed={isPressed('Backslash')} />
          </div>
          <div className="flex gap-[var(--key-gap)] ml-[var(--section-gap)]">
            <Key code="Delete" label="Del" width={1} isPressed={isPressed('Delete')} />
            <Key code="End" label="End" width={1} isPressed={isPressed('End')} />
            <Key code="PageDown" label="PgDn" width={1} isPressed={isPressed('PageDown')} />
          </div>
        </div>

        {/* Caps 행 */}
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="CapsLock" label="Caps" width={1.75} isPressed={isPressed('CapsLock')} />
            <Key code="KeyA" label="A" width={1} isPressed={isPressed('KeyA')} />
            <Key code="KeyS" label="S" width={1} isPressed={isPressed('KeyS')} />
            <Key code="KeyD" label="D" width={1} isPressed={isPressed('KeyD')} />
            <Key code="KeyF" label="F" width={1} isPressed={isPressed('KeyF')} />
            <Key code="KeyG" label="G" width={1} isPressed={isPressed('KeyG')} />
            <Key code="KeyH" label="H" width={1} isPressed={isPressed('KeyH')} />
            <Key code="KeyJ" label="J" width={1} isPressed={isPressed('KeyJ')} />
            <Key code="KeyK" label="K" width={1} isPressed={isPressed('KeyK')} />
            <Key code="KeyL" label="L" width={1} isPressed={isPressed('KeyL')} />
            <Key code="Semicolon" label=";" width={1} isPressed={isPressed('Semicolon')} />
            <Key code="Quote" label="'" width={1} isPressed={isPressed('Quote')} />
            <Key code="Enter" label="Enter" width={2.25} isPressed={isPressed('Enter')} />
          </div>
          <div className="nav-empty" />
        </div>

        {/* Shift 행 */}
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="ShiftLeft" label="Shift" width={2.25} isPressed={isPressed('ShiftLeft')} />
            <Key code="KeyZ" label="Z" width={1} isPressed={isPressed('KeyZ')} />
            <Key code="KeyX" label="X" width={1} isPressed={isPressed('KeyX')} />
            <Key code="KeyC" label="C" width={1} isPressed={isPressed('KeyC')} />
            <Key code="KeyV" label="V" width={1} isPressed={isPressed('KeyV')} />
            <Key code="KeyB" label="B" width={1} isPressed={isPressed('KeyB')} />
            <Key code="KeyN" label="N" width={1} isPressed={isPressed('KeyN')} />
            <Key code="KeyM" label="M" width={1} isPressed={isPressed('KeyM')} />
            <Key code="Comma" label="," width={1} isPressed={isPressed('Comma')} />
            <Key code="Period" label="." width={1} isPressed={isPressed('Period')} />
            <Key code="Slash" label="/" width={1} isPressed={isPressed('Slash')} />
            <Key code="ShiftRight" label="Shift" width={2.75} isPressed={isPressed('ShiftRight')} />
          </div>
          <div className="flex gap-[var(--key-gap)] ml-[var(--section-gap)]">
            <div className="arrow-spacer" />
            <Key code="ArrowUp" label="↑" width={1} isPressed={isPressed('ArrowUp')} />
            <div className="arrow-spacer" />
          </div>
        </div>

        {/* Ctrl 행 */}
        <div className="flex items-center">
          <div className="flex gap-[var(--key-gap)]">
            <Key code="ControlLeft" label="Ctrl" width={1.25} isPressed={isPressed('ControlLeft')} />
            <Key code="MetaLeft" label="Win" width={1.25} isPressed={isPressed('MetaLeft')} />
            <Key code="AltLeft" label="Alt" width={1.25} isPressed={isPressed('AltLeft')} />
            <Key code="Space" label="" width={6.25} isPressed={isPressed('Space')} />
            <Key code="AltRight" label="Alt" width={1.25} isPressed={isPressed('AltRight')} />
            <Key code="MetaRight" label="Win" width={1.25} isPressed={isPressed('MetaRight')} />
            <Key code="ContextMenu" label="Fn" width={1.25} isPressed={isPressed('ContextMenu')} />
            <Key code="ControlRight" label="Ctrl" width={1.25} isPressed={isPressed('ControlRight')} />
          </div>
          <div className="flex gap-[var(--key-gap)] ml-[var(--section-gap)]">
            <Key code="ArrowLeft" label="←" width={1} isPressed={isPressed('ArrowLeft')} />
            <Key code="ArrowDown" label="↓" width={1} isPressed={isPressed('ArrowDown')} />
            <Key code="ArrowRight" label="→" width={1} isPressed={isPressed('ArrowRight')} />
          </div>
        </div>
      </div>
    </div>
  );
}
