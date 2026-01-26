/**
 * 볼륨 노드 인터페이스
 */
export interface VolumeNode {
  setVolume: (volume: number) => void;
  fadeIn: (duration: number, targetVolume?: number) => void;
  fadeOut: (duration: number) => void;
  getVolume: () => number;
  getNode: () => GainNode;
  mute: () => void;
  unmute: () => void;
}

/**
 * 볼륨 제어 노드 생성
 */
export const createVolumeNode = (
  context: AudioContext,
  initialVolume: number = 1.0
): VolumeNode => {
  const gainNode = context.createGain();
  gainNode.gain.value = Math.max(0, Math.min(1, initialVolume));
  let previousVolume = 1.0;

  return {
    setVolume(volume) {
      gainNode.gain.value = Math.max(0, Math.min(1, volume));
    },

    fadeIn(duration, targetVolume = 1.0) {
      const currentTime = gainNode.context.currentTime;
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(targetVolume, currentTime + duration);
    },

    fadeOut(duration) {
      const currentTime = gainNode.context.currentTime;
      const currentVolume = gainNode.gain.value;
      gainNode.gain.setValueAtTime(currentVolume, currentTime);
      gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
    },

    getVolume() {
      return gainNode.gain.value;
    },

    getNode() {
      return gainNode;
    },

    mute() {
      previousVolume = gainNode.gain.value;
      gainNode.gain.value = 0;
    },

    unmute() {
      gainNode.gain.value = previousVolume;
    },
  };
};
