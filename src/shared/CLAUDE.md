# shared/

범용 공통 컴포넌트, 유틸리티, 타입 정의, 프로바이더. 특정 feature에 속하지 않는 공용 코드.

## 파일 구조

- `ui/` - Header, Navigation, ThemeSwitcher, LanguageSwitcher
- `providers/ThemeProvider.tsx` - CSS custom properties 기반 테마 (light/dark/system), localStorage 연동
- `types/global.d.ts`, `types/audio.d.ts` - 전역 타입 선언
- `utils/logger.ts` - 로깅 유틸
- `utils/constants.ts` - 공통 상수

## 관련 디렉토리

- `src/app/` - shared UI 컴포넌트(Header 등)를 페이지에서 사용
- `src/features/` - shared 유틸리티를 각 feature에서 활용
