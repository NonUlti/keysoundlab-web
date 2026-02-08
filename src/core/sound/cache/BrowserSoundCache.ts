import { createLogger } from '@/shared/utils/logger';

const logger = createLogger('BrowserSoundCache');

const CACHE_NAME = 'keysoundlab-sounds-v1';

/**
 * 브라우저 Cache API 기반 사운드 캐시 인터페이스
 * 네트워크 요청 없이 디스크 캐시에서 사운드 파일을 제공
 */
export interface BrowserSoundCache {
  get: (url: string) => Promise<ArrayBuffer | null>;
  put: (url: string, response: Response) => Promise<void>;
  has: (url: string) => Promise<boolean>;
  remove: (url: string) => Promise<boolean>;
  clear: () => Promise<void>;
  isAvailable: () => boolean;
}

/**
 * 브라우저 Cache API 사용 가능 여부 확인
 */
const isCacheApiAvailable = (): boolean => {
  return typeof window !== 'undefined' && 'caches' in window;
};

/**
 * 브라우저 Cache API 기반 사운드 캐시 생성
 * Cache API를 사용하여 사운드 파일의 Response를 디스크에 영속 캐싱
 */
export const createBrowserSoundCache = (): BrowserSoundCache => {
  const available = isCacheApiAvailable();

  if (!available) {
    logger.info('Cache API not available, browser caching disabled');
  }

  const getCache = async (): Promise<Cache | null> => {
    if (!available) return null;
    try {
      return await caches.open(CACHE_NAME);
    } catch (error) {
      logger.error('Failed to open cache:', error);
      return null;
    }
  };

  return {
    async get(url) {
      const cache = await getCache();
      if (!cache) return null;

      try {
        const response = await cache.match(url);
        if (!response) return null;

        logger.debug(`Browser cache hit: ${url}`);
        return response.arrayBuffer();
      } catch (error) {
        logger.error(`Failed to get from browser cache: ${url}`, error);
        return null;
      }
    },

    async put(url, response) {
      const cache = await getCache();
      if (!cache) return;

      try {
        await cache.put(url, response.clone());
        logger.debug(`Stored in browser cache: ${url}`);
      } catch (error) {
        logger.error(`Failed to put in browser cache: ${url}`, error);
      }
    },

    async has(url) {
      const cache = await getCache();
      if (!cache) return false;

      try {
        const response = await cache.match(url);
        return response !== undefined;
      } catch {
        return false;
      }
    },

    async remove(url) {
      const cache = await getCache();
      if (!cache) return false;

      try {
        return await cache.delete(url);
      } catch {
        return false;
      }
    },

    async clear() {
      if (!available) return;

      try {
        await caches.delete(CACHE_NAME);
        logger.info('Browser sound cache cleared');
      } catch (error) {
        logger.error('Failed to clear browser cache:', error);
      }
    },

    isAvailable() {
      return available;
    },
  };
};
