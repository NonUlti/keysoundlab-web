'use client';

interface KeyProps {
  code: string;
  label: string;
  isPressed: boolean;
  width?: number;
  onMouseDown?: (code: string) => void;
  onMouseUp?: (code: string) => void;
}

/**
 * 개별 키 컴포넌트
 * width는 u 단위 (1u = 기본 키 크기)
 */
export function Key({ code, label, isPressed, width = 1, onMouseDown, onMouseUp }: KeyProps) {
  const style = {
    '--key-width': width,
  } as React.CSSProperties;

  return (
    <div
      className={`key bg-primary border border-border rounded flex items-center justify-center text-xs font-medium transition-all duration-[50ms] ease-in-out select-none cursor-pointer text-text-secondary hover:border-[rgba(var(--accent-rgb),0.5)] ${
        isPressed
          ? '!bg-accent translate-y-px shadow-[0_0_12px_rgba(var(--accent-rgb),0.5)] !border-accent !text-white'
          : ''
      }`}
      data-key-code={code}
      style={style}
      onMouseDown={() => onMouseDown?.(code)}
      onMouseUp={() => onMouseUp?.(code)}
      onMouseLeave={isPressed ? () => onMouseUp?.(code) : undefined}
    >
      <span>{label}</span>
    </div>
  );
}
