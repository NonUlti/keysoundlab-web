/**
 * 다이나믹 레인지 컴프레서 설정
 */
export interface CompressorConfig {
  threshold?: number;
  knee?: number;
  ratio?: number;
  attack?: number;
  release?: number;
}

/**
 * 컴프레서 노드 인터페이스
 */
export interface CompressorNode {
  configure: (config: CompressorConfig) => void;
  getNode: () => DynamicsCompressorNode;
  getReduction: () => number;
}

/**
 * 다이나믹 레인지 압축 노드 생성
 */
export const createCompressorNode = (
  context: AudioContext,
  config: CompressorConfig = {}
): CompressorNode => {
  const compressor = context.createDynamicsCompressor();

  const configure = (cfg: CompressorConfig): void => {
    if (cfg.threshold !== undefined) {
      compressor.threshold.value = cfg.threshold;
    }
    if (cfg.knee !== undefined) {
      compressor.knee.value = cfg.knee;
    }
    if (cfg.ratio !== undefined) {
      compressor.ratio.value = cfg.ratio;
    }
    if (cfg.attack !== undefined) {
      compressor.attack.value = cfg.attack;
    }
    if (cfg.release !== undefined) {
      compressor.release.value = cfg.release;
    }
  };

  // 초기 설정 적용
  configure(config);

  return {
    configure,

    getNode() {
      return compressor;
    },

    getReduction() {
      return compressor.reduction;
    },
  };
};
