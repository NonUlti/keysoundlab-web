import type { KeyType } from '../keyboard/KeyType';

/**
 * 스위치 타입
 */
export type SwitchType = 'linear' | 'tactile' | 'clicky';

/**
 * 키 타입별 사운드 매핑
 * soundFiles 배열의 인덱스를 지정
 */
export interface SoundMapping {
  default: number;      // 일반 키 사운드 (필수)
  spacebar?: number;    // 스페이스바 사운드 (선택)
  enter?: number;       // 엔터 사운드 (선택)
  shift?: number;       // 시프트 사운드 (선택)
  backspace?: number;   // 백스페이스 사운드 (선택)
  stabilizer?: number;  // 기타 스태빌라이저 키 사운드 (선택)
}

/**
 * 스위치 엔티티
 */
export interface Switch {
  id: string;
  name: string;
  manufacturer: string;
  type: SwitchType;
  actuationForce: number; // gram
  bottomOutForce: number; // gram
  preTravel: number; // mm
  totalTravel: number; // mm
  soundFiles: string[];
  soundMapping?: SoundMapping; // 키 타입별 사운드 매핑 (없으면 모든 키가 soundFiles[0] 사용)
  description?: string;
  imageUrl?: string;
}

/**
 * 스위치 필터 조건
 */
export interface SwitchFilter {
  type?: SwitchType;
  manufacturer?: string;
  minActuationForce?: number;
  maxActuationForce?: number;
  searchQuery?: string;
}
