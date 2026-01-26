'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { createSoundLoader } from '@/core/sound/loader/SoundLoader';
import { createSoundCache, type SoundCache } from '@/core/sound/cache/SoundCache';
import type { Switch } from '@/domain/switch/types';
import { createLogger } from '@/shared/utils/logger';

const logger = createLogger('SoundPreload');

/**
 * 사운드 에셋 프리로딩 훅
 */
export function useSoundPreload(context: AudioContext | null, switches: Switch[]) {
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

    const soundLoader = createSoundLoader(context);
    const soundCache = createSoundCache(50);

    setLoader(soundLoader);
    setCache(soundCache);
    loadedSwitchIds.current.clear(); // 캐시 초기화 시 로딩된 ID도 초기화
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

        // 모든 사운드 파일을 개별적으로 로딩
        const loadItems: Array<{ id: string; url: string }> = [];
        for (const sw of switchesToLoad) {
          for (const soundFile of sw.soundFiles) {
            loadItems.push({
              id: soundFile,
              url: soundFile,
            });
          }
        }

        logger.info(`Starting to load ${loadItems.length} sound file(s) from ${switchesToLoad.length} switch(es)`);

        let loaded = 0;
        for (const item of loadItems) {
          // 중복 로딩 방지 체크 (URL 기반)
          if (cache.has(item.id)) {
            logger.debug(`Skipping already cached: ${item.id}`);
            loaded++;
            setProgress((loaded / loadItems.length) * 100);
            continue;
          }

          logger.debug(`Loading sound: ${item.url}`);
          const result = await loader.load(item.id, item.url);
          cache.set(result.id, result.buffer);
          logger.debug(`Successfully loaded: ${item.id}`);

          loaded++;
          setProgress((loaded / loadItems.length) * 100);
        }

        // 스위치 ID를 로딩 완료 목록에 추가
        for (const sw of switchesToLoad) {
          loadedSwitchIds.current.add(sw.id);
        }

        logger.info(`All sounds loaded. Cache size: ${cache.size()}`);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to preload sounds');
        logger.error('Error loading sounds:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    preloadSounds();
  }, [loader, cache, switchIds]);

  return {
    loading,
    progress,
    error,
    cache,
  };
}
