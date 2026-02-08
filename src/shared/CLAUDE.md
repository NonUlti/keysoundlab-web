# shared/

범용 공통 컴포넌트, 유틸리티, 타입 정의, 프로바이더. 특정 feature에 속하지 않는 공용 코드.

## 파일 구조

- `ui/` - Header, Navigation, ThemeSwitcher, LanguageSwitcher
- `providers/ThemeProvider.tsx` - CSS custom properties 기반 테마 (light/dark/system), localStorage 연동
- `types/global.d.ts`, `types/audio.d.ts` - 전역 타입 선언
- `utils/logger.ts` - 로깅 유틸
- `utils/constants.ts` - 공통 상수

## 주의사항

- **ThemeProvider**: 테마 수동 변경 시에만 `body`에 `theme-transition` 클래스 300ms 적용 (초기 로드 시 트랜지션 방지). 실제 플래시 방지는 `layout.tsx`의 인라인 스크립트가 담당
- **Logger**: 기본 logger는 개발 환경(`process.env.NODE_ENV === 'development'`)에서만 활성. `[ISO timestamp] [prefix] [LEVEL]` 형식 출력

## 관련 디렉토리

- `src/app/` - shared UI 컴포넌트(Header 등)를 페이지에서 사용
- `src/features/` - shared 유틸리티를 각 feature에서 활용
