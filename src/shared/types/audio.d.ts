/**
 * 오디오 관련 타입 정의
 */

export type AudioContextState = 'suspended' | 'running' | 'closed';

export interface AudioBufferMetadata {
  duration: number;
  sampleRate: number;
  numberOfChannels: number;
  length: number;
}
