import type { Switch as ISwitch, SwitchType } from '../types';
import type { KeyType } from '../../keyboard/KeyType';

/**
 * 스위치 생성 함수
 */
export const createSwitch = (data: ISwitch): ISwitch => {
  return {
    id: data.id,
    name: data.name,
    manufacturer: data.manufacturer,
    type: data.type,
    actuationForce: data.actuationForce,
    bottomOutForce: data.bottomOutForce,
    preTravel: data.preTravel,
    totalTravel: data.totalTravel,
    soundFiles: data.soundFiles,
    soundMapping: data.soundMapping,
    description: data.description,
    imageUrl: data.imageUrl,
  };
};

/**
 * 스위치의 주요 사운드 파일 반환 (기본 키 사운드)
 */
export const getPrimarySoundFile = (sw: ISwitch): string | null => {
  return sw.soundFiles[0] ?? null;
};

/**
 * 특정 키 타입에 맞는 사운드 파일 반환
 */
export const getSoundFileForKeyType = (sw: ISwitch, keyType: KeyType): string | null => {
  // soundMapping이 없으면 기본 사운드 반환
  if (!sw.soundMapping) {
    return getPrimarySoundFile(sw);
  }

  // 키 타입에 해당하는 인덱스 찾기
  let soundIndex: number | undefined;

  switch (keyType) {
    case 'spacebar':
      soundIndex = sw.soundMapping.spacebar;
      break;
    case 'enter':
      soundIndex = sw.soundMapping.enter;
      break;
    case 'shift':
      soundIndex = sw.soundMapping.shift;
      break;
    case 'backspace':
      soundIndex = sw.soundMapping.backspace;
      break;
    case 'stabilizer':
      soundIndex = sw.soundMapping.stabilizer;
      break;
    case 'default':
    default:
      soundIndex = sw.soundMapping.default;
      break;
  }

  // 매핑이 없으면 기본 사운드로 폴백
  if (soundIndex === undefined) {
    soundIndex = sw.soundMapping.default;
  }

  // 해당 인덱스의 사운드 파일 반환
  return sw.soundFiles[soundIndex] ?? null;
};

/**
 * 스위치가 특정 타입인지 확인
 */
export const isType = (sw: ISwitch, type: SwitchType): boolean => {
  return sw.type === type;
};

/**
 * 액추에이션 포스가 범위 내에 있는지 확인
 */
export const isActuationForceInRange = (
  sw: ISwitch,
  min: number,
  max: number
): boolean => {
  return sw.actuationForce >= min && sw.actuationForce <= max;
};

/**
 * 검색 쿼리와 매칭되는지 확인
 */
export const matchesQuery = (sw: ISwitch, query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  return (
    sw.name.toLowerCase().includes(lowerQuery) ||
    sw.manufacturer.toLowerCase().includes(lowerQuery) ||
    sw.type.toLowerCase().includes(lowerQuery) ||
    (sw.description?.toLowerCase().includes(lowerQuery) ?? false)
  );
};
