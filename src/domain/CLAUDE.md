# domain/

비즈니스 로직 계층. 키보드 이벤트 처리/매핑과 스위치 엔티티/리포지토리를 담당한다.

## 파일 구조

- `keyboard/KeyboardListener.ts` - keydown/keyup 이벤트 리스너 (`createKeyboardListener`)
- `keyboard/KeyStateTracker.ts` - 키 눌림/해제 상태 추적 (`createKeyStateTracker`)
- `keyboard/KeyboardMapper.ts` - keyCode → soundId 매핑 (`createKeyboardMapper`)
- `keyboard/KeyType.ts` - 키 타입 판별 (default, spacebar, enter, shift, backspace, stabilizer)
- `switch/models/Switch.ts` - 스위치 엔티티 생성 및 유틸 함수 (`createSwitch`, `getSoundFileForKeyType`)
- `switch/repository/` - Repository 패턴 + 어댑터 (`LocalSwitchAdapter`: JSON 로드, `RemoteSwitchAdapter`: API placeholder)

## 패턴

- 팩토리 함수 + 클로저 패턴 (`createXxx()`)
- Repository 패턴: `SwitchRepository` 인터페이스 + `ISwitchAdapter`로 데이터 소스 추상화
- 키 타입별 사운드 매핑: `soundMapping` 설정으로 스페이스바/엔터 등 큰 키에 다른 사운드 지정. 매핑 없으면 첫 번째 사운드 파일을 기본값으로 사용

## 주의사항

- `KeyboardListener`는 `input`, `textarea`, `contentEditable` 요소의 이벤트를 자동 필터링 (폼 입력 시 사운드 미재생)
- `KeyStateTracker`는 키 반복(repeat) 이벤트 방지 — 이미 눌린 키의 press 이벤트 무시
- `SwitchRepository`는 별도 인메모리 `Map` 캐시로 스위치 데이터 캐싱 (사운드 캐시와 별개)
- KeyType 6종: `default`, `spacebar`, `enter`, `shift`, `backspace`, `stabilizer` — 물리 키보드의 스태빌라이저 유무에 따라 분류

## 관련 디렉토리

- `src/core/` - domain이 사용하는 하위 계층 (오디오/사운드)
- `src/features/` - domain 로직을 React 훅으로 연결
- `public/data/switches.json` - 스위치 메타데이터 원본
