import type { ISoundLoader, LoadResult, LoadProgress } from './types';
import { createLogger } from '@/shared/utils/logger';

const logger = createLogger('SoundLoader');

/**
 * 사운드 로더 생성
 */
export const createSoundLoader = (context: AudioContext): ISoundLoader => {
  const progressCallbacks = new Map<string, (progress: LoadProgress) => void>();

  const load = async (id: string, url: string): Promise<LoadResult> => {
    try {
      logger.info(`Loading sound: ${id} from ${url}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;

      // 진행 상황 추적
      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];
      let loaded = 0;

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(value);
          loaded += value.length;

          // 진행 상황 콜백 호출
          const callback = progressCallbacks.get(id);
          if (callback && total > 0) {
            callback({
              id,
              loaded,
              total,
              percentage: (loaded / total) * 100,
            });
          }
        }
      }

      // ArrayBuffer로 변환
      const arrayBuffer = new Uint8Array(
        chunks.reduce((acc, chunk) => acc + chunk.length, 0)
      );
      let offset = 0;
      for (const chunk of chunks) {
        arrayBuffer.set(chunk, offset);
        offset += chunk.length;
      }

      // 오디오 디코딩
      const buffer = await context.decodeAudioData(arrayBuffer.buffer);

      logger.info(`Successfully loaded sound: ${id}`);
      return { id, buffer, url };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`Failed to load sound ${id} from ${url}:`, errorMessage);
      throw new Error(`Failed to load sound "${id}" from ${url}: ${errorMessage}`);
    }
  };

  const loadMultiple = async (
    items: Array<{ id: string; url: string }>
  ): Promise<LoadResult[]> => {
    const promises = items.map(item => load(item.id, item.url));
    return Promise.all(promises);
  };

  const onProgress = (id: string, callback: (progress: LoadProgress) => void): void => {
    progressCallbacks.set(id, callback);
  };

  const offProgress = (id: string): void => {
    progressCallbacks.delete(id);
  };

  return {
    load,
    loadMultiple,
    onProgress,
    offProgress,
  };
};
