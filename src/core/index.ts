// Audio
export {
  AudioEngine,
  AudioGraph,
  createSoundPlayer,
  createVoicePool,
  createVolumeNode,
  createCompressorNode,
} from './audio';

export type {
  IAudioEngine,
  AudioEngineConfig,
  VoicePool,
  ISoundPlayer,
  PlayOptions,
  PlayingSound,
  VolumeNode,
  CompressorNode,
  CompressorConfig,
} from './audio';

// Sound
export {
  createSoundLoader,
  executePreloadStrategy,
  createSoundCache,
  LRUCacheStrategy,
  createLRUCacheStrategy,
  createSoundRegistry,
  registerMultiple,
  getRegistrySize,
  clearRegistry,
} from './sound';

export type {
  ISoundLoader,
  LoadProgress,
  LoadResult,
  PreloadStrategyType,
  SoundCache,
  CacheStrategy,
  ISoundRegistry,
  SoundAsset,
} from './sound';
