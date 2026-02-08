# app/

Next.js 14 App Router 진입점. 라우팅, 레이아웃, 프로바이더, 글로벌 스타일을 관리한다.

## 파일 구조

- `providers.tsx` - 클라이언트 컴포넌트. 글로벌 Context 프로바이더 래퍼 (현재 ThemeProvider만 포함)
- `globals.css` - Tailwind CSS v4 임포트, 테마 CSS 변수, 키보드 레이아웃 CSS, 그래디언트 유틸리티
- `[locale]/layout.tsx` - 서버 컴포넌트. i18n, 메타데이터 생성, 테마 플래시 방지 인라인 스크립트
- `[locale]/page.tsx` - 랜딩 페이지 (클라이언트 컴포넌트)
- `[locale]/sound-test/page.tsx` - 메인 사운드 테스트 페이지. 모든 feature를 오케스트레이션

## 패턴

- `layout.tsx`는 서버 컴포넌트, 페이지들은 `'use client'`로 클라이언트 컴포넌트
- `generateStaticParams()`로 지원 로케일별 페이지 사전 렌더링
- `generateMetadata()`로 i18n 메시지 기반 동적 메타데이터 생성
- `sound-test/page.tsx`가 전체 기능 흐름 조합: SwitchRepository 초기화 → 스위치 선택 → 사운드 프리로드 → 키보드 입력 → 사운드 재생

## 주의사항

- **테마 플래시 방지 스크립트**: `layout.tsx`의 `<head>` 인라인 스크립트가 하이드레이션 전에 `data-theme` 설정. `MutationObserver`로 속성 삭제 방어. `<html>`에 `suppressHydrationWarning` 필수
- **AudioContext 자동 resume**: `sound-test/page.tsx`에서 스위치 선택 시 + 키 입력 시 두 가지 경로로 자동 resume 시도 (브라우저 autoplay 정책 대응)
- **Repository 초기화**: `useState`에 팩토리 함수를 넘겨 한 번만 생성 (`useState(() => new SwitchRepository(...))`)

## 관련 디렉토리

- `src/features/` - 페이지에서 조합하는 기능 모듈들
- `src/shared/ui/` - Header 등 공통 UI 컴포넌트
- `src/i18n/` - 국제화 설정
- `src/config/` - 앱 설정 (데이터 소스 URL 등)
