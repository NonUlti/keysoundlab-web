/**
 * 사운드 에셋 메타데이터
 */
export interface SoundAsset {
  id: string;
  url: string;
  duration?: number;
  sampleRate?: number;
  channels?: number;
  tags?: string[];
}

/**
 * 사운드 레지스트리 인터페이스
 */
export interface ISoundRegistry {
  register(asset: SoundAsset): void;
  unregister(id: string): void;
  get(id: string): SoundAsset | undefined;
  getAll(): SoundAsset[];
  findByTag(tag: string): SoundAsset[];
}
