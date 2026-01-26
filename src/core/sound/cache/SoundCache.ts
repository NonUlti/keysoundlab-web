import { LRUCacheStrategy } from './CacheStrategy';

/**
 * 사운드 캐시 인터페이스
 */
export interface SoundCache {
  set: (id: string, buffer: AudioBuffer) => void;
  get: (id: string) => AudioBuffer | undefined;
  has: (id: string) => boolean;
  remove: (id: string) => boolean;
  clear: () => void;
  size: () => number;
  getMemoryUsage: () => number;
}

/**
 * AudioBuffer의 메모리 사용량 계산 (bytes)
 */
const calculateBufferSize = (buffer: AudioBuffer): number => {
  // AudioBuffer 메모리 = 채널 수 × 샘플 수 × 4바이트 (Float32)
  return buffer.numberOfChannels * buffer.length * 4;
};

/**
 * 인메모리 오디오 버퍼 캐시 생성
 */
export const createSoundCache = (maxSize: number = 50): SoundCache => {
  const cache = new LRUCacheStrategy<string, AudioBuffer>(maxSize);
  const memorySizes = new Map<string, number>(); // ID별 메모리 크기 추적
  let totalMemory = 0;

  return {
    set(id, buffer) {
      // 기존 항목이 있으면 메모리 크기 차감
      const existingSize = memorySizes.get(id);
      if (existingSize !== undefined) {
        totalMemory -= existingSize;
      }

      cache.set(id, buffer);

      const bufferSize = calculateBufferSize(buffer);
      memorySizes.set(id, bufferSize);
      totalMemory += bufferSize;
    },

    get(id) {
      return cache.get(id);
    },

    has(id) {
      return cache.has(id);
    },

    remove(id) {
      const size = memorySizes.get(id);
      if (size !== undefined) {
        totalMemory -= size;
        memorySizes.delete(id);
      }
      return cache.remove(id);
    },

    clear() {
      cache.clear();
      memorySizes.clear();
      totalMemory = 0;
    },

    size() {
      return cache.size();
    },

    getMemoryUsage() {
      return totalMemory;
    },
  };
};
