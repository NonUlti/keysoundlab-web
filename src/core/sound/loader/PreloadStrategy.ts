import type { ISoundLoader, LoadResult } from './types';

/**
 * 프리로드 전략 타입
 */
export type PreloadStrategyType = 'all' | 'lazy' | 'priority';

/**
 * 프리로드 아이템
 */
export interface PreloadItem {
  id: string;
  url: string;
  priority?: number;
}

/**
 * 전략에 따라 사운드를 정렬/필터링하여 로드
 * - all: 모든 항목을 병렬 로드
 * - lazy: 아무것도 로드하지 않음 (실제 재생 시 로드)
 * - priority: 우선순위 높은 항목부터 순차 로드 (모든 항목 로드)
 */
export const executePreloadStrategy = async (
  loader: ISoundLoader,
  strategy: PreloadStrategyType,
  items: PreloadItem[]
): Promise<LoadResult[]> => {
  switch (strategy) {
    case 'all':
      return preloadAll(loader, items);
    case 'lazy':
      return [];
    case 'priority':
      return preloadByPriority(loader, items);
  }
};

/**
 * 모든 사운드 병렬 로드
 */
const preloadAll = async (
  loader: ISoundLoader,
  items: PreloadItem[]
): Promise<LoadResult[]> => {
  return loader.loadMultiple(items);
};

/**
 * 우선순위에 따라 순차 로드
 * 높은 우선순위 항목을 먼저 로드한 후, 나머지도 로드
 */
const preloadByPriority = async (
  loader: ISoundLoader,
  items: PreloadItem[]
): Promise<LoadResult[]> => {
  // 우선순위로 정렬 (높은 것부터)
  const sorted = [...items].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  const results: LoadResult[] = [];

  // 우선순위 높은 항목 먼저 로드
  const highPriority = sorted.filter(item => (item.priority ?? 0) > 5);
  const lowPriority = sorted.filter(item => (item.priority ?? 0) <= 5);

  if (highPriority.length > 0) {
    const highResults = await loader.loadMultiple(highPriority);
    results.push(...highResults);
  }

  // 나머지 항목도 로드
  if (lowPriority.length > 0) {
    const lowResults = await loader.loadMultiple(lowPriority);
    results.push(...lowResults);
  }

  return results;
};
