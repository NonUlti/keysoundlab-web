import type { ISoundLoader } from './types';

/**
 * 프리로드 전략 타입
 */
export type PreloadStrategyType = 'all' | 'lazy' | 'priority';

/**
 * 전략에 따라 사운드 로드
 */
export const executePreloadStrategy = async (
  loader: ISoundLoader,
  strategy: PreloadStrategyType,
  items: Array<{ id: string; url: string; priority?: number }>
): Promise<void> => {
  switch (strategy) {
    case 'all':
      await preloadAll(loader, items);
      break;
    case 'lazy':
      // Lazy 로딩은 실제 재생 시 로드하므로 여기서는 아무것도 하지 않음
      break;
    case 'priority':
      await preloadByPriority(loader, items);
      break;
  }
};

/**
 * 모든 사운드 즉시 로드
 */
const preloadAll = async (
  loader: ISoundLoader,
  items: Array<{ id: string; url: string }>
): Promise<void> => {
  await loader.loadMultiple(items);
};

/**
 * 우선순위에 따라 로드
 */
const preloadByPriority = async (
  loader: ISoundLoader,
  items: Array<{ id: string; url: string; priority?: number }>
): Promise<void> => {
  // 우선순위로 정렬 (높은 것부터)
  const sorted = [...items].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  // 우선순위 높은 항목만 먼저 로드
  const highPriority = sorted.filter(item => (item.priority ?? 0) > 0);
  if (highPriority.length > 0) {
    await loader.loadMultiple(highPriority);
  }
};
