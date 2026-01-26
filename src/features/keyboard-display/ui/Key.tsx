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
  // CSS 변수 --key-unit을 사용하여 키 크기 계산
  // width * unit + (width - 1) * gap 으로 갭 포함 크기 계산
  const style = {
    '--key-width': width,
  } as React.CSSProperties;

  return (
    <div
      className={`key ${isPressed ? 'pressed' : ''}`}
      data-key-code={code}
      style={style}
    >
      <span className="key-label">{label}</span>
    </div>
  );
}
