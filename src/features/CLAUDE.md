# features/

기능별 UI 모듈. 각 feature는 `hooks/`(React 훅)과 `ui/`(컴포넌트)로 구성되며, `index.ts`에서 public API를 export한다.

## 파일 구조

- `switch-selector/` - 스위치 목록/필터/선택 UI (`SwitchSelector`, `useSwitchList`, `useSwitchSelection`)
- `keyboard-display/` - 87키 TKL 키보드 시각화 (`KeyboardDisplay`, `useKeyboardVisualization`)
- `sound-controller/` - 오디오 엔진 제어, 볼륨 조절, 프리로드 (`SoundControls`, `useSoundEngine`, `useSoundPreload`)
- `workspace/` - 메인 레이아웃 오케스트레이션, 키보드 입력 → 사운드 재생 흐름 (`useKeyboardInput`)

## 패턴

- 각 feature 디렉토리: `hooks/` + `ui/` 구조
- barrel export: `index.ts`에서 훅과 컴포넌트만 노출
- workspace의 `useKeyboardInput`이 전체 흐름을 오케스트레이션 (키 입력 → 매핑 → 사운드 재생)

## 관련 디렉토리

- `src/domain/` - features가 사용하는 비즈니스 로직
- `src/core/` - features가 사용하는 오디오/사운드 엔진
- `src/app/` - features를 페이지에 조합
