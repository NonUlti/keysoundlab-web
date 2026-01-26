/**
 * 스위치 메타데이터 저장소 생성
 */
export interface SwitchMetadataStore {
  register: (
    switchId: string,
    soundFiles: string[],
    additionalData?: Record<string, unknown>
  ) => void;
  getSoundFiles: (switchId: string) => string[] | null;
  getAdditionalData: (switchId: string) => Record<string, unknown> | null;
  has: (switchId: string) => boolean;
  unregister: (switchId: string) => boolean;
  clear: () => void;
}

type MetadataEntry = {
  soundFiles: string[];
  additionalData?: Record<string, unknown>;
};

/**
 * 스위치 메타데이터 저장소 팩토리 함수
 */
export const createSwitchMetadataStore = (): SwitchMetadataStore => {
  const metadata = new Map<string, MetadataEntry>();

  return {
    register(switchId, soundFiles, additionalData) {
      metadata.set(switchId, { soundFiles, additionalData });
    },

    getSoundFiles(switchId) {
      return metadata.get(switchId)?.soundFiles ?? null;
    },

    getAdditionalData(switchId) {
      return metadata.get(switchId)?.additionalData ?? null;
    },

    has(switchId) {
      return metadata.has(switchId);
    },

    unregister(switchId) {
      return metadata.delete(switchId);
    },

    clear() {
      metadata.clear();
    },
  };
};
