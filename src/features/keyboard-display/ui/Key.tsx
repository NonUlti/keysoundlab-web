'use client';

interface KeyProps {
  code: string;
  label: string;
  isPressed: boolean;
  width?: number;
}

/**
 * 개별 키 컴포넌트
 * width는 u 단위 (1u = 기본 키 크기)
 */
export function Key({ code, label, isPressed, width = 1 }: KeyProps) {
  const style = {
    '--key-width': width,
  } as React.CSSProperties;

  return (
    <div
      className={`key bg-primary border border-border rounded flex items-center justify-center text-[11px] font-medium transition-all duration-[50ms] ease-in-out select-none cursor-pointer text-text-secondary hover:border-[rgba(var(--accent-rgb),0.5)] ${
        isPressed
          ? '!bg-accent translate-y-px shadow-[0_0_12px_rgba(var(--accent-rgb),0.5)] !border-accent !text-white'
          : ''
      }`}
      data-key-code={code}
      style={style}
    >
      <span>{label}</span>
    </div>
  );
}
