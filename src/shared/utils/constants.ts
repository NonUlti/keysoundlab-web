/**
 * 오디오 관련 상수
 */
export const AUDIO_CONSTANTS = {
  DEFAULT_SAMPLE_RATE: 48000,
  DEFAULT_LATENCY_HINT: 'interactive' as AudioContextLatencyCategory,
  MAX_VOICE_POOL_SIZE: 32,
  CACHE_SIZE: 50,
} as const;
