import type { PlayingSound } from './types';

/**
 * 보이스 풀 인터페이스
 */
export interface VoicePool {
  addVoice: (sound: PlayingSound) => void;
  removeVoice: (sound: PlayingSound) => void;
  stopAll: () => void;
  getActiveCount: () => number;
  setMaxVoices: (max: number) => void;
}

/**
 * 폴리포닉 보이스 관리 생성
 */
export const createVoicePool = (maxVoices: number = 32): VoicePool => {
  const voices: PlayingSound[] = [];
  let max = maxVoices;

  return {
    addVoice(sound) {
      voices.push(sound);

      if (voices.length > max) {
        const oldest = voices.shift();
        if (oldest) {
          oldest.stop();
        }
      }
    },

    removeVoice(sound) {
      const index = voices.findIndex(v => v.id === sound.id);
      if (index !== -1) {
        voices.splice(index, 1);
      }
    },

    stopAll() {
      voices.forEach(voice => voice.stop());
      voices.length = 0;
    },

    getActiveCount() {
      return voices.length;
    },

    setMaxVoices(maxVoicesParam) {
      max = maxVoicesParam;

      // 현재 보이스가 새로운 최대값을 초과하면 오래된 것부터 제거
      while (voices.length > max) {
        const oldest = voices.shift();
        if (oldest) {
          oldest.stop();
        }
      }
    },
  };
};
