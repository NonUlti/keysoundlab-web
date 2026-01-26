/**
 * 오디오 엔진 설정
 */

import { AUDIO_CONSTANTS } from '@/shared/utils/constants';

export const audioConfig = {
  /**
   * AudioContext 설정
   */
  context: {
    sampleRate: AUDIO_CONSTANTS.DEFAULT_SAMPLE_RATE,
    latencyHint: AUDIO_CONSTANTS.DEFAULT_LATENCY_HINT,
  },

  /**
   * 보이스 풀 설정
   */
  voicePool: {
    maxVoices: AUDIO_CONSTANTS.MAX_VOICE_POOL_SIZE,
  },

  /**
   * 캐시 설정
   */
  cache: {
    maxSize: AUDIO_CONSTANTS.CACHE_SIZE,
  },

  /**
   * 기본 볼륨
   */
  volume: {
    default: 0.8,
    min: 0,
    max: 1,
  },

  /**
   * 컴프레서 설정
   */
  compressor: {
    threshold: -24,
    knee: 30,
    ratio: 12,
    attack: 0.003,
    release: 0.25,
  },
} as const;
