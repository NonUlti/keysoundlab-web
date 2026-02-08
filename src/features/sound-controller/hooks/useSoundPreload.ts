'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { createSoundLoader } from '@/core/sound/loader/SoundLoader';
import { createSoundCache, type SoundCache } from '@/core/sound/cache/SoundCache';
import { createBrowserSoundCache } from '@/core/sound/cache/BrowserSoundCache';
import { executePreloadStrategy, type PreloadStrategyType, type PreloadItem } from '@/core/sound/loader/PreloadStrategy';
import type { Switch } from '@/domain/switch/types';
import { createLogger } from '@/shared/utils/logger';

const logger = createLogger('SoundPreload');

/**
 * 스위치의 사운드 파일을 우선순위 부여된 로드 아이템으로 변환
 * - soundMapping.default에 해당하는 사운드: 최고 우선순위 (10)
 * - 나머지 사운드 (spacebar, enter 등): 낮은 우선순위 (1)
 */
const buildLoadItems = (sw: Switch): PreloadItem[] => {
  const defaultIndex = sw.soundMapping?.default ?? 0;

  return sw.soundFiles.map((soundFile, index) => ({
    id: soundFile,
    url: soundFile,
    priority: index === defaultIndex ? 10 : 1,
  }));
};

interface UseSoundPreloadOptions {
  strategy?: PreloadStrategyType;
}

/**
 * 사운드 에셋 프리로딩 훅
 * 프리로드 전략(all/lazy/priority)에 따라 사운드를 로드
 * - all: 모든 사운드를 병렬로 즉시 로드
 * - lazy: 사운드를 미리 로드하지 않음 (재생 시 로드)
 * - priority: 기본 키 사운드를 먼저 로드, 나머지는 이후 로드
 */
export function useSoundPreload(
  context: AudioContext | null,
  switches: Switch[],
  options: UseSoundPreloadOptions = {}
) {
  const { strategy = 'priority' } = options;
  const [loader, setLoader] = useState<ReturnType<typeof createSoundLoader> | null>(null);
  const [cache, setCache] = useState<SoundCache | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  // 이미 로딩된 스위치 ID 추적
  const loadedSwitchIds = useRef<Set<string>>(new Set());

  // 스위치 ID 문자열로 변환하여 의존성 비교 최적화
  const switchIds = useMemo(() => switches.map(s => s.id).sort().join(','), [switches]);

  // 로더 및 캐시 초기화
  useEffect(() => {
    if (!context) return;

    const browserCache = createBrowserSoundCache();
    const soundLoader = createSoundLoader(context, { browserCache });
    const soundCache = createSoundCache(50);

    setLoader(soundLoader);
    setCache(soundCache);
    loadedSwitchIds.current.clear();
  }, [context]);

  // 스위치 사운드 프리로드
  useEffect(() => {
    if (!loader || !cache || switches.length === 0) {
      if (switches.length === 0) {
        logger.debug('No switches to load');
      }
      return;
    }

    // 이미 로딩된 스위치 필터링
    const switchesToLoad = switches.filter(sw => {
      const alreadyLoaded = loadedSwitchIds.current.has(sw.id);
      if (alreadyLoaded) {
        logger.debug(`Sound already loaded: ${sw.id}`);
        return false;
      }
      return true;
    });

    if (switchesToLoad.length === 0) {
      logger.debug('All switches already loaded');
      setLoading(false);
      return;
    }

    const preloadSounds = async () => {
      try {
        setLoading(true);
        setError(null);
        setProgress(0);

        // 우선순위 부여된 로드 아이템 빌드 (중복 URL 제거)
        const loadItems: PreloadItem[] = [];
        const seenIds = new Set<string>();
        for (const sw of switchesToLoad) {
          for (const item of buildLoadItems(sw)) {
            if (!seenIds.has(item.id) && !cache.has(item.id)) {
              seenIds.add(item.id);
              loadItems.push(item);
            }
          }
        }

        if (loadItems.length === 0) {
          logger.debug('All sound files already cached');
          for (const sw of switchesToLoad) {
            loadedSwitchIds.current.add(sw.id);
          }
          setLoading(false);
          return;
        }

        logger.info(
          `Loading ${loadItems.length} sound file(s) from ${switchesToLoad.length} switch(es) [strategy: ${strategy}]`
        );

        // 프리로드 전략 실행
        const results = await executePreloadStrategy(loader, strategy, loadItems);

        // 로드 결과를 캐시에 저장
        for (const result of results) {
          cache.set(result.id, result.buffer);
        }

        setProgress(100);

        // 스위치 ID를 로딩 완료 목록에 추가
        for (const sw of switchesToLoad) {
          loadedSwitchIds.current.add(sw.id);
        }

        logger.info(
          `Preload complete. Loaded: ${results.length}, Cache size: ${cache.size()}`
        );
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to preload sounds');
        logger.error('Error loading sounds:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    preloadSounds();
  }, [loader, cache, switchIds, strategy]);

  return {
    loading,
    progress,
    error,
    cache,
  };
}
