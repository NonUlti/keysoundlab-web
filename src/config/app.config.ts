/**
 * 앱 레벨 설정
 */

export const appConfig = {
  /**
   * 앱 메타데이터
   */
  meta: {
    name: 'KeySoundLab',
    description: '키보드 스위치 사운드 테스트 웹 애플리케이션',
    version: '0.1.0',
  },

  /**
   * 데이터 소스 설정
   */
  dataSource: {
    switchesUrl: '/data/switches.json',
    soundsBaseUrl: '/sounds',
  },

  /**
   * UI 설정
   */
  ui: {
    theme: 'dark' as 'light' | 'dark',
    animationDuration: 200, // ms
  },

  /**
   * 기능 플래그
   */
  features: {
    enableKeyboardVisualization: true,
    enableVolumeControl: true,
    enableSwitchFilters: true,
  },
} as const;
