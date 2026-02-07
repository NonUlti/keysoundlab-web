# KeySoundLab

키보드 스위치 사운드를 실시간으로 테스트할 수 있는 웹 애플리케이션. 사용자가 스위치를 선택하고 물리적 키보드로 타이핑하면 해당 스위치의 사운드를 재생한다.

## 기술 스택

- 언어: TypeScript 5.4
- 프레임워크: Next.js 14 (App Router) + React 18
- 오디오: Web Audio API
- 스타일: Tailwind CSS 4 + CSS custom properties (테마)
- 국제화: next-intl (ko/en)
- 상태 관리: React Hooks
- 패키지 매니저: Yarn

## 빌드/실행 명령어

- 설치: `yarn install`
- 개발 서버: `yarn dev`
- 빌드: `yarn build`
- 프로덕션 실행: `yarn start`
- 린트: `yarn lint`
- 타입 체크: `yarn type-check`

## 아키텍처 개요

Clean Architecture 기반 계층 구조. 의존성 방향: UI → Features → Domain → Core

- **Core**: 프레임워크 무관. Web Audio API 추상화, 사운드 에셋 관리 (로더/캐시/레지스트리)
- **Domain**: 비즈니스 로직. 키보드 이벤트 처리, 스위치 엔티티/리포지토리
- **Features**: React 훅 + UI 컴포넌트로 기능 모듈화
- **Shared**: 공통 UI 컴포넌트, 유틸리티, 타입, 프로바이더

팩토리 함수 + 클로저 패턴으로 상태 캡슐화 (클래스 대신 `createXxx()` 팩토리 사용).

## 디렉토리 구조

- `src/core/` - 오디오 엔진, 사운드 로더/캐시/레지스트리 (프레임워크 독립)
- `src/domain/` - 키보드 매핑/리스너, 스위치 모델/리포지토리
- `src/features/` - switch-selector, keyboard-display, sound-controller, workspace
- `src/shared/` - Header, Navigation, ThemeSwitcher, LanguageSwitcher, 유틸리티
- `src/app/` - Next.js App Router 진입점 (`[locale]/` 기반 라우팅)
- `src/config/` - 앱/오디오 설정
- `src/i18n/` - 국제화 설정 (routing, request, constants)
- `messages/` - 번역 JSON (ko, en)
- `public/sounds/` - WAV 사운드 파일
- `public/data/switches.json` - 스위치 메타데이터

## 코드 스타일

- strict TypeScript (`strict: true`)
- 경로 별칭: `@/*` → `./src/*`, `@/core/*`, `@/domain/*`, `@/features/*`, `@/shared/*`, `@/config/*`
- 팩토리 함수 패턴: `createXxx()` (클래스 사용 지양)
- barrel export: 각 모듈에 `index.ts`로 public API 정의
- 컴포넌트: `'use client'` 지시어로 클라이언트/서버 컴포넌트 구분
