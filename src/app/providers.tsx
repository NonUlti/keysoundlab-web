'use client';

import { ReactNode } from 'react';

/**
 * 글로벌 Context 프로바이더
 * 향후 상태 관리 라이브러리 통합 시 여기에 추가
 */
export function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
