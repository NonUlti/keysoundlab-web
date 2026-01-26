import type { ISoundPlayer, PlayOptions, PlayingSound } from './types';
import { createLogger } from '@/shared/utils/logger';

const logger = createLogger('SoundPlayer');

/**
 * 사운드 플레이어 생성
 */
export const createSoundPlayer = (
  context: AudioContext,
  destination?: AudioNode
): ISoundPlayer => {
  const playingSounds = new Map<string, PlayingSound>();
  let nextId = 0;
  const dest = destination ?? context.destination;

  const cleanup = (id: string): void => {
    const sound = playingSounds.get(id);
    if (sound) {
      sound.source.disconnect();
      sound.gainNode.disconnect();
      playingSounds.delete(id);
    }
  };

  const stopSound = (sound: PlayingSound): void => {
    try {
      sound.source.stop();
    } catch {
      // 이미 중지된 경우 무시
    }
    cleanup(sound.id);
  };

  return {
    play(buffer, options = {}) {
      const id = `sound-${nextId++}`;

      // AudioBufferSourceNode 생성
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = options.playbackRate ?? 1.0;
      source.detune.value = options.detune ?? 0;
      source.loop = options.loop ?? false;

      // GainNode 생성 (볼륨 제어용)
      const gainNode = context.createGain();
      gainNode.gain.value = options.volume ?? 1.0;

      // 노드 연결: source -> gain -> destination
      source.connect(gainNode);
      gainNode.connect(dest);

      // 재생 시작
      const startTime = context.currentTime;
      try {
        source.start(0, options.offset ?? 0);
      } catch (error) {
        logger.error('Failed to start sound:', error);
        cleanup(id);
        throw error;
      }

      const playingSound: PlayingSound = {
        id,
        source,
        gainNode,
        startTime,
        stop: () => stopSound(playingSound),
      };

      // 재생 완료 시 자동 정리
      source.onended = () => {
        cleanup(id);
      };

      playingSounds.set(id, playingSound);
      return playingSound;
    },

    stop(sound) {
      try {
        sound.source.stop();
      } catch (error) {
        // 이미 중지된 경우 무시
      }
      cleanup(sound.id);
    },

    stopAll() {
      playingSounds.forEach(sound => {
        try {
          sound.source.stop();
        } catch (error) {
          // 무시
        }
      });
      playingSounds.clear();
    },

    getActiveCount() {
      return playingSounds.size;
    },
  };
};
