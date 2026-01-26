import type { KeyboardMapping } from './types';
import type { Switch } from '../switch/types';
import { getKeyType } from './KeyType';
import { getSoundFileForKeyType } from '../switch/models/Switch';

/**
 * 키보드 매퍼 상태
 */
export interface KeyboardMapperState {
  mapping: KeyboardMapping;
  currentSwitch: Switch | null;
}

/**
 * 키보드 매퍼 인터페이스
 */
export interface KeyboardMapper {
  setMapping: (mapping: KeyboardMapping) => void;
  setCurrentSwitch: (sw: Switch | null) => void;
  mapKeyToSound: (keyCode: string) => string | null;
  setKeySound: (keyCode: string, soundId: string) => void;
  reset: () => void;
  getMapping: () => KeyboardMapping;
}

/**
 * 키보드 매퍼 생성
 */
export const createKeyboardMapper = (): KeyboardMapper => {
  const state: KeyboardMapperState = {
    mapping: {},
    currentSwitch: null,
  };

  return {
    setMapping(mapping) {
      state.mapping = mapping;
    },

    setCurrentSwitch(sw) {
      state.currentSwitch = sw;
    },

    mapKeyToSound(keyCode) {
      // 커스텀 매핑이 있으면 우선 사용
      if (state.mapping[keyCode]) {
        return state.mapping[keyCode];
      }

      // 기본 매핑: 키 타입에 따라 사운드 파일 결정
      if (state.currentSwitch) {
        const keyType = getKeyType(keyCode);
        const soundFile = getSoundFileForKeyType(state.currentSwitch, keyType);
        return soundFile;
      }

      return null;
    },

    setKeySound(keyCode, soundId) {
      state.mapping[keyCode] = soundId;
    },

    reset() {
      state.mapping = {};
      state.currentSwitch = null;
    },

    getMapping() {
      return { ...state.mapping };
    },
  };
};
