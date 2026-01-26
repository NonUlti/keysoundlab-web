import type { AudioEngineConfig, IAudioEngine, AudioEngineState } from './types';

/**
 * 싱글톤 Web Audio API 컨텍스트 매니저
 * 애플리케이션 전체에서 단일 AudioContext 인스턴스를 관리
 */
export class AudioEngine implements IAudioEngine {
  private static instance: AudioEngine | null = null;
  private context: AudioContext;

  private constructor(config: AudioEngineConfig = {}) {
    this.context = new AudioContext({
      sampleRate: config.sampleRate,
      latencyHint: config.latencyHint ?? 'interactive',
    });
  }

  /**
   * AudioEngine 싱글톤 인스턴스 획득
   */
  public static getInstance(config?: AudioEngineConfig): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine(config);
    }
    return AudioEngine.instance;
  }

  /**
   * AudioContext 인스턴스 반환
   */
  public getContext(): AudioContext {
    return this.context;
  }

  /**
   * 현재 오디오 컨텍스트 상태 반환
   */
  public getState(): AudioEngineState {
    return this.context.state;
  }

  /**
   * 오디오 컨텍스트 재개 (사용자 제스처 후 호출 필요)
   */
  public async resume(): Promise<void> {
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
  }

  /**
   * 오디오 컨텍스트 일시 중지
   */
  public async suspend(): Promise<void> {
    if (this.context.state === 'running') {
      await this.context.suspend();
    }
  }

  /**
   * 오디오 컨텍스트 종료
   */
  public async close(): Promise<void> {
    await this.context.close();
    AudioEngine.instance = null;
  }

  /**
   * 싱글톤 인스턴스 리셋 (테스트용)
   */
  public static reset(): void {
    AudioEngine.instance = null;
  }
}
