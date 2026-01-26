/**
 * 앱 전역 상수
 */

export const APP_NAME = 'KeySoundLab';
export const APP_VERSION = '0.1.0';

/**
 * 오디오 관련 상수
 */
export const AUDIO_CONSTANTS = {
  DEFAULT_SAMPLE_RATE: 48000,
  DEFAULT_LATENCY_HINT: 'interactive' as AudioContextLatencyCategory,
  MAX_VOICE_POOL_SIZE: 32,
  CACHE_SIZE: 50,
} as const;

/**
 * 키보드 관련 상수
 */
export const KEYBOARD_CONSTANTS = {
  REPEAT_DELAY: 500, // ms
  DOUBLE_TAP_THRESHOLD: 300, // ms
} as const;
