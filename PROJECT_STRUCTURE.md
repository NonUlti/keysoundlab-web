# KeySoundLab Web - Project Structure

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| UI | React 18 |
| Language | TypeScript 5.4 |
| Audio | Web Audio API |
| Styling | CSS (vanilla) |
| i18n | next-intl |
| State | React Hooks |
| Theme | CSS custom properties + localStorage |
| Package Manager | Yarn |

## Architecture

Clean Architecture 기반의 계층 구조를 따릅니다.

```
UI (React Components)
       |
Features (React Hooks + UI)
       |
Domain (Business Logic - Framework Free)
       |
Core (Audio/Sound - Pure Functions)
```

## Directory Structure

```
keysoundlab-web/
├── messages/                        # i18n 번역 파일
│   ├── en/                          # English
│   │   ├── common.json
│   │   ├── home.json
│   │   └── soundTest.json
│   └── ko/                          # Korean
│       ├── common.json
│       ├── home.json
│       └── soundTest.json
│
├── public/                          # 정적 에셋
│   ├── data/
│   │   └── switches.json            # 스위치 메타데이터
│   ├── images/
│   │   └── switches/                # 스위치 이미지
│   └── sounds/                      # WAV 사운드 파일
│       ├── cherry-mx-red.wav
│       ├── cherry-mx-blue.wav
│       └── cherry-mx-brown.wav
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── [locale]/                # 로케일 기반 라우팅
│   │   │   ├── layout.tsx           # 루트 레이아웃 (i18n, 테마 FOUC 방지)
│   │   │   ├── page.tsx             # 랜딩 페이지
│   │   │   └── sound-test/
│   │   │       └── page.tsx         # 사운드 테스트 페이지
│   │   ├── globals.css              # 글로벌 스타일
│   │   └── providers.tsx            # 글로벌 Context 프로바이더
│   │
│   ├── core/                        # 프레임워크 독립적 핵심 로직
│   │   ├── audio/                   # Web Audio API 추상화
│   │   │   ├── engine/
│   │   │   │   ├── AudioEngine.ts   # 싱글톤 AudioContext 관리
│   │   │   │   ├── AudioGraph.ts    # 오디오 노드 연결 그래프
│   │   │   │   └── types.ts
│   │   │   ├── player/
│   │   │   │   ├── SoundPlayer.ts   # 사운드 재생 컨트롤러
│   │   │   │   ├── VoicePool.ts     # 폴리포닉 오디오 보이스 풀
│   │   │   │   └── types.ts
│   │   │   └── effects/
│   │   │       ├── VolumeNode.ts    # Gain 노드 래퍼
│   │   │       ├── CompressorNode.ts # 다이내믹 컴프레서
│   │   │       └── types.ts
│   │   │
│   │   └── sound/                   # 사운드 에셋 관리
│   │       ├── loader/
│   │       │   ├── SoundLoader.ts   # WAV 파일 fetch + decode
│   │       │   ├── PreloadStrategy.ts
│   │       │   └── types.ts
│   │       ├── cache/
│   │       │   ├── SoundCache.ts    # LRU 캐시
│   │       │   └── CacheStrategy.ts
│   │       └── registry/
│   │           ├── SoundRegistry.ts # 사운드 에셋 메타데이터 레지스트리
│   │           └── types.ts
│   │
│   ├── domain/                      # 비즈니스 로직 (프레임워크 의존성 없음)
│   │   ├── keyboard/                # 키보드 입력 처리
│   │   │   ├── KeyboardListener.ts  # 키보드 이벤트 리스너
│   │   │   ├── KeyStateTracker.ts   # 키 상태 추적 (pressed/released)
│   │   │   ├── KeyboardMapper.ts    # keyCode -> soundId 매핑
│   │   │   ├── KeyType.ts          # 키 타입 enum
│   │   │   └── types.ts
│   │   │
│   │   └── switch/                  # 스위치 엔티티 및 리포지토리
│   │       ├── models/
│   │       │   ├── Switch.ts        # 스위치 엔티티 인터페이스
│   │       │   └── SwitchMetadata.ts
│   │       ├── repository/
│   │       │   ├── SwitchRepository.ts        # 리포지토리 인터페이스
│   │       │   └── adapters/
│   │       │       ├── LocalSwitchAdapter.ts   # JSON 파일 로드
│   │       │       └── RemoteSwitchAdapter.ts  # 백엔드 API (placeholder)
│   │       └── types.ts
│   │
│   ├── features/                    # UI 피처 모듈 (React)
│   │   ├── switch-selector/         # 스위치 선택 UI
│   │   │   ├── hooks/
│   │   │   │   ├── useSwitchList.ts
│   │   │   │   └── useSwitchSelection.ts
│   │   │   └── ui/
│   │   │       ├── SwitchSelector.tsx
│   │   │       ├── SwitchCard.tsx
│   │   │       └── SwitchFilters.tsx
│   │   │
│   │   ├── keyboard-display/        # 키보드 시각화
│   │   │   ├── hooks/
│   │   │   │   └── useKeyboardVisualization.ts
│   │   │   └── ui/
│   │   │       ├── KeyboardDisplay.tsx  # 87키 TKL 레이아웃
│   │   │       ├── Key.tsx
│   │   │       └── KeyHighlight.tsx
│   │   │
│   │   ├── sound-controller/        # 오디오 컨트롤 UI
│   │   │   ├── hooks/
│   │   │   │   ├── useSoundEngine.ts
│   │   │   │   └── useSoundPreload.ts
│   │   │   └── ui/
│   │   │       ├── SoundControls.tsx    # 볼륨 조절
│   │   │       └── LoadingIndicator.tsx
│   │   │
│   │   └── workspace/               # 메인 레이아웃
│   │       ├── hooks/
│   │       │   └── useKeyboardInput.ts  # 키보드 -> 사운드 흐름 오케스트레이션
│   │       └── ui/
│   │           └── WorkspaceLayout.tsx
│   │
│   ├── shared/                      # 공용 유틸리티 및 컴포넌트
│   │   ├── hooks/
│   │   │   ├── useDebounce.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   └── useLocalStorage.ts
│   │   ├── ui/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── ThemeSwitcher.tsx
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx
│   │   ├── types/
│   │   │   ├── global.d.ts
│   │   │   └── audio.d.ts
│   │   └── utils/
│   │       ├── constants.ts
│   │       └── logger.ts
│   │
│   ├── config/                      # 설정 파일
│   │   ├── app.config.ts
│   │   └── audio.config.ts
│   │
│   ├── i18n/                        # 국제화 설정
│   │   ├── constants.ts             # 로케일, 네임스페이스 정의
│   │   ├── routing.ts               # next-intl 라우팅
│   │   └── request.ts               # 서버사이드 메시지 로드
│   │
│   └── middleware.ts                # Next.js 미들웨어 (로케일 감지)
│
├── next.config.js
├── tsconfig.json                    # 경로 별칭: @/, @/core, @/domain 등
├── package.json
└── yarn.lock
```

## Data Flow

키보드 입력부터 사운드 재생까지의 흐름:

```
Physical Keyboard Press
       |
KeyboardListener (domain) - keydown 감지
       |
useKeyboardInput (workspace hook) - 이벤트 수신
       |
KeyboardMapper (domain) - keyCode -> soundId 변환
       |
useSoundPreload (sound-controller) - 캐싱된 AudioBuffer 제공
       |
useSoundEngine.playSound() - 재생 트리거
       |
SoundPlayer (core) - SourceNode 생성, VoicePool 관리
       |
Audio Graph: SourceNode -> VolumeNode -> CompressorNode -> destination
```

## Key Patterns

- **Factory Functions**: 클래스 대신 팩토리 함수 + 클로저로 상태 캡슐화
- **Repository Pattern**: SwitchRepository 인터페이스 + 어댑터로 데이터 소스 추상화
- **Voice Pool**: 최대 32개 동시 발음을 위한 폴리포닉 보이스 관리
- **LRU Cache**: 디코딩된 AudioBuffer의 효율적 캐싱
- **Sound Mapping**: 키 타입별(스페이스바, 엔터, 스태빌라이저 등) 차별화된 사운드
