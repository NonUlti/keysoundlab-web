/**
 * 사운드 재생 옵션
 */
export interface PlayOptions {
  volume?: number;
  playbackRate?: number;
  detune?: number;
  loop?: boolean;
  offset?: number;
}

/**
 * 재생 중인 사운드 인스턴스
 */
export interface PlayingSound {
  id: string;
  source: AudioBufferSourceNode;
  gainNode: GainNode;
  startTime: number;
  stop(): void;
}

/**
 * 사운드 플레이어 인터페이스
 */
export interface ISoundPlayer {
  play(buffer: AudioBuffer, options?: PlayOptions): PlayingSound;
  stop(sound: PlayingSound): void;
  stopAll(): void;
  getActiveCount(): number;
}
