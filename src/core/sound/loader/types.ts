/**
 * 사운드 로드 결과
 */
export interface LoadResult {
  id: string;
  buffer: AudioBuffer;
  url: string;
}

/**
 * 로드 진행 상황
 */
export interface LoadProgress {
  id: string;
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * 사운드 로더 인터페이스
 */
export interface ISoundLoader {
  load: (id: string, url: string) => Promise<LoadResult>;
  loadMultiple: (items: Array<{ id: string; url: string }>) => Promise<LoadResult[]>;
  onProgress?: (id: string, callback: (progress: LoadProgress) => void) => void;
  offProgress?: (id: string) => void;
}
