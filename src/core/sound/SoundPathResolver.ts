import type { KeyType } from '@/domain/keyboard/KeyType';

/**
 * 사운드 파일 경로 해석기
 *
 * 사운드 파일 디렉토리 구조 규칙:
 *   /sounds/{switchId}/default.wav      - 기본 키 사운드
 *   /sounds/{switchId}/spacebar.wav     - 스페이스바 사운드
 *   /sounds/{switchId}/enter.wav        - 엔터 사운드
 *   /sounds/{switchId}/shift.wav        - 시프트 사운드
 *   /sounds/{switchId}/backspace.wav    - 백스페이스 사운드
 *   /sounds/{switchId}/stabilizer.wav   - 스태빌라이저 키 사운드
 *
 * 레거시 구조 (단일 파일):
 *   /sounds/cherry-mx-red.wav
 */

interface SoundPathResolverOptions {
  basePath?: string;
}

export interface SoundPathResolver {
  resolve: (switchId: string, keyType: KeyType) => string;
  resolveDefault: (switchId: string) => string;
  getAllPaths: (switchId: string) => Record<KeyType, string>;
  isStructuredPath: (path: string) => boolean;
}

const KEY_TYPE_FILENAMES: Record<KeyType, string> = {
  default: 'default.wav',
  spacebar: 'spacebar.wav',
  enter: 'enter.wav',
  shift: 'shift.wav',
  backspace: 'backspace.wav',
  stabilizer: 'stabilizer.wav',
};

export const createSoundPathResolver = (
  options: SoundPathResolverOptions = {}
): SoundPathResolver => {
  const { basePath = '/sounds' } = options;

  const resolve = (switchId: string, keyType: KeyType): string => {
    const filename = KEY_TYPE_FILENAMES[keyType] ?? KEY_TYPE_FILENAMES.default;
    return `${basePath}/${switchId}/${filename}`;
  };

  const resolveDefault = (switchId: string): string => {
    return resolve(switchId, 'default');
  };

  const getAllPaths = (switchId: string): Record<KeyType, string> => {
    const paths = {} as Record<KeyType, string>;
    for (const keyType of Object.keys(KEY_TYPE_FILENAMES) as KeyType[]) {
      paths[keyType] = resolve(switchId, keyType);
    }
    return paths;
  };

  const isStructuredPath = (path: string): boolean => {
    // 구조화된 경로: /sounds/{switchId}/{keyType}.wav
    const parts = path.replace(basePath, '').split('/').filter(Boolean);
    return parts.length === 2;
  };

  return {
    resolve,
    resolveDefault,
    getAllPaths,
    isStructuredPath,
  };
};
