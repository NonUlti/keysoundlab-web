/**
 * 오디오 엔진 설정 타입
 */
export interface AudioEngineConfig {
  sampleRate?: number;
  latencyHint?: AudioContextLatencyCategory;
}

/**
 * 오디오 엔진 상태
 */
export type AudioEngineState = AudioContextState;

/**
 * 오디오 컨텍스트 인터페이스
 */
export interface IAudioEngine {
  getContext(): AudioContext;
  getState(): AudioEngineState;
  resume(): Promise<void>;
  suspend(): Promise<void>;
  close(): Promise<void>;
}
