/**
 * i18n Constants
 * 로케일 및 네임스페이스 상수 정의
 */

export const LOCALES = {
  KO: 'ko',
  EN: 'en',
} as const;

export const NAMESPACES = {
  COMMON: 'common',
  HOME: 'home',
  SOUND_TEST: 'soundTest',
} as const;

export const DEFAULT_LOCALE = LOCALES.KO;

export const SUPPORTED_LOCALES = [LOCALES.KO, LOCALES.EN] as const;

// Types
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type Namespace = (typeof NAMESPACES)[keyof typeof NAMESPACES];
