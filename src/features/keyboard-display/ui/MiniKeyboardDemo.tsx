'use client';

import { useState, useEffect, useCallback } from 'react';

const DEMO_KEYS = [
  { label: 'Q', code: 'KeyQ' },
  { label: 'W', code: 'KeyW' },
  { label: 'E', code: 'KeyE' },
  { label: 'R', code: 'KeyR' },
  { label: 'T', code: 'KeyT' },
  { label: 'Y', code: 'KeyY' },
];

/**
 * 랜딩 페이지 Hero 영역의 미니 키보드 데모
 * 자동 애니메이션 + 호버/클릭 인터랙션
 */
export function MiniKeyboardDemo() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // 자동 타이핑 데모 애니메이션
  useEffect(() => {
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const animate = () => {
      setActiveKey(DEMO_KEYS[index].code);

      setTimeout(() => {
        setActiveKey(null);
      }, 150);

      index = (index + 1) % DEMO_KEYS.length;
      const delay = 200 + Math.random() * 300;
      timeout = setTimeout(animate, delay);
    };

    // 1.5초 후 애니메이션 시작
    timeout = setTimeout(animate, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const handleKeyHover = useCallback((code: string) => {
    setActiveKey(code);
  }, []);

  const handleKeyLeave = useCallback(() => {
    setActiveKey(null);
  }, []);

  return (
    <div className="inline-flex gap-1.5 md:gap-2 mt-8 mb-4">
      {DEMO_KEYS.map((key) => (
        <div
          key={key.code}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border flex items-center justify-center text-sm md:text-base font-medium transition-all duration-75 cursor-pointer select-none ${
            activeKey === key.code
              ? 'bg-accent border-accent text-white translate-y-px shadow-[0_0_12px_rgba(var(--accent-rgb),0.5)]'
              : 'bg-primary border-border text-text-secondary hover:border-[rgba(var(--accent-rgb),0.5)]'
          }`}
          onMouseEnter={() => handleKeyHover(key.code)}
          onMouseLeave={handleKeyLeave}
        >
          {key.label}
        </div>
      ))}
    </div>
  );
}
