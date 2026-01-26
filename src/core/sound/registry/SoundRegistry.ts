import type { ISoundRegistry, SoundAsset } from './types';

/**
 * 사운드 레지스트리 생성
 */
export const createSoundRegistry = (): ISoundRegistry => {
  const assets = new Map<string, SoundAsset>();
  const tagIndex = new Map<string, Set<string>>();

  return {
    register(asset) {
      assets.set(asset.id, asset);

      // 태그 인덱스 업데이트
      if (asset.tags) {
        for (const tag of asset.tags) {
          if (!tagIndex.has(tag)) {
            tagIndex.set(tag, new Set());
          }
          tagIndex.get(tag)!.add(asset.id);
        }
      }
    },

    unregister(id) {
      const asset = assets.get(id);
      if (asset) {
        // 태그 인덱스에서 제거
        if (asset.tags) {
          for (const tag of asset.tags) {
            tagIndex.get(tag)?.delete(id);
          }
        }
        assets.delete(id);
      }
    },

    get(id) {
      return assets.get(id);
    },

    getAll() {
      return Array.from(assets.values());
    },

    findByTag(tag) {
      const ids = tagIndex.get(tag);
      if (!ids) return [];

      return Array.from(ids)
        .map(id => assets.get(id))
        .filter((asset): asset is SoundAsset => asset !== undefined);
    },
  };
};

// 헬퍼 함수들
export const registerMultiple = (
  registry: ISoundRegistry,
  assets: SoundAsset[]
): void => {
  assets.forEach(asset => registry.register(asset));
};

export const getRegistrySize = (registry: ISoundRegistry): number => {
  return registry.getAll().length;
};

export const clearRegistry = (registry: ISoundRegistry): void => {
  const allAssets = registry.getAll();
  allAssets.forEach(asset => registry.unregister(asset.id));
};
