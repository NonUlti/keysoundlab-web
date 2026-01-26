'use client';

interface KeyHighlightProps {
  keyCode: string;
}

/**
 * 활성 키 시각 피드백
 * 키 누름 시 애니메이션 효과
 */
export function KeyHighlight({ keyCode }: KeyHighlightProps) {
  return (
    <div className="key-highlight" data-key-code={keyCode}>
      <div className="ripple" />
    </div>
  );
}
