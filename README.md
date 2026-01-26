# KeySoundLab

키보드 스위치 사운드를 실시간으로 테스트할 수 있는 웹 애플리케이션

## 프로젝트 개요

사용자가 키보드 스위치를 선택하고 물리적 키보드로 타이핑하면 해당 스위치의 사운드를 실시간으로 재생합니다.

## 기술 스택

- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript
- **Audio**: Web Audio API
- **스타일**: CSS

## 프로젝트 구조

```
src/
├── core/              # 프레임워크 무관 핵심 로직 (함수형)
│   ├── audio/         # Web Audio API 추상화
│   │   ├── engine/    # AudioContext 관리
│   │   ├── player/    # 사운드 재생 엔진
│   │   └── effects/   # 오디오 이펙트 (Volume, Compressor)
│   └── sound/         # 사운드 에셋 관리
│       ├── loader/    # 오디오 파일 로드 및 디코드
│       ├── cache/     # LRU 캐시
│       └── registry/  # 에셋 메타데이터 레지스트리
├── domain/            # 비즈니스 로직 (함수형)
│   ├── keyboard/      # 키보드 이벤트 처리 및 매핑
│   └── switch/        # 스위치 엔티티 및 리포지토리
├── features/          # 기능별 모듈 (UI + 훅)
│   ├── switch-selector/    # 스위치 선택 UI
│   ├── keyboard-display/   # 시각적 키보드
│   ├── sound-controller/   # 오디오 제어 UI
│   └── workspace/          # 메인 레이아웃
├── shared/            # 공통 유틸 및 컴포넌트
├── app/               # Next.js App Router 진입점
└── config/            # 설정 파일
```

## 아키텍처 특징

### 함수형 프로그래밍 패턴

이 프로젝트는 **함수형 프로그래밍** 패러다임을 따릅니다:

- **팩토리 함수**: 클래스 대신 팩토리 함수로 인스턴스 생성
  ```typescript
  const player = createSoundPlayer(context);
  const mapper = createKeyboardMapper();
  ```

- **클로저 기반 상태 관리**: 내부 상태를 클로저로 캡슐화
- **순수 함수**: 부수효과 없는 순수 함수로 로직 구현

### 계층 분리

**의존성 방향**: UI → Features → Domain → Core

- **Core**: 프레임워크 무관. React 의존성 제로.
- **Domain**: 비즈니스 로직. 최소한의 프레임워크 결합.
- **Features**: UI와 비즈니스 로직 연결.
- **Shared**: 범용 유틸리티 및 공통 컴포넌트.

## 시작하기

### 설치

```bash
yarn install
```

### 사운드 파일 설정

**중요**: 애플리케이션을 실행하기 전에 사운드 파일을 준비해야 합니다.

1. **사운드 파일 다운로드 또는 녹음**
   - [Mechvibes](https://mechvibes.com/) - 다양한 키보드 스위치 사운드 팩
   - [Freesound.org](https://freesound.org/) - 검색: "mechanical keyboard", "cherry mx"
   - 직접 녹음: 실제 키보드를 스마트폰으로 녹음

2. **파일 배치**

   다운로드한 WAV 파일을 다음 경로에 저장:
   ```
   public/sounds/
   ├── cherry-mx-red.wav
   ├── cherry-mx-red-spacebar.wav    # 선택: 스페이스바 사운드
   ├── cherry-mx-red-stabilizer.wav  # 선택: 큰 키 사운드
   ├── cherry-mx-blue.wav
   ├── cherry-mx-brown.wav
   └── gateron-yellow.wav
   ```

   **키 타입별 사운드 (선택사항)**:
   - 일반 키와 스페이스바/엔터/시프트 등의 큰 키를 다르게 녹음
   - 스태빌라이저가 있는 키는 특유의 "딸깍" 소리가 추가됨
   - 각 스위치마다 최대 여러 개의 사운드 파일 사용 가능

3. **테스트용 사운드 생성 (선택사항)**

   실제 사운드 파일이 없다면, 브라우저 콘솔에서 Web Audio API로 임시 비프음을 생성할 수 있습니다:
   ```javascript
   // 브라우저 개발자 도구 콘솔에서 실행
   const generateTestSound = (frequency, duration = 0.1) => {
     const ctx = new AudioContext();
     const osc = ctx.createOscillator();
     const gain = ctx.createGain();

     osc.frequency.value = frequency;
     gain.gain.setValueAtTime(0.3, ctx.currentTime);
     gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

     osc.connect(gain);
     gain.connect(ctx.destination);

     osc.start();
     osc.stop(ctx.currentTime + duration);
   };

   // 테스트: generateTestSound(440); // A4 음
   ```

### 개발 서버 실행

```bash
yarn dev
```

브라우저에서 `http://localhost:3000` 접속

### 빌드

```bash
yarn build
yarn start
```

### 타입 체크

```bash
yarn type-check
```

## 주요 기능

1. **스위치 선택**: 다양한 키보드 스위치 중 선택
2. **실시간 사운드**: 물리적 키보드 입력 시 즉시 사운드 재생
3. **키보드 시각화**: 눌린 키를 화면에 표시 (87키 TKL 레이아웃)
4. **볼륨 제어**: 사운드 볼륨 조절
5. **필터 및 검색**: 스위치 타입, 제조사별 필터링
6. **키 타입별 사운드**: 스페이스바, 엔터, 시프트 등 큰 키는 다른 소리 재생 가능

### 키 타입별 사운드 매핑

실제 기계식 키보드에서 스페이스바, 엔터, 시프트 같은 큰 키들은 **스태빌라이저**(stabilizer) 때문에 일반 키와 다른 소리를 냅니다. KeySoundLab은 이를 지원합니다.

#### 지원되는 키 타입

- `default`: 일반 키 (1u)
- `spacebar`: 스페이스바 (6.25u, 큰 스태빌라이저)
- `enter`: 엔터 (2.25u, 스태빌라이저)
- `shift`: 시프트 (2.25u/2.75u, 스태빌라이저)
- `backspace`: 백스페이스 (2u, 스태빌라이저)
- `stabilizer`: 기타 스태빌라이저 키 (Tab, Caps, \ 등)

#### 설정 방법

`public/data/switches.json`에서 각 스위치의 `soundMapping`을 설정:

```json
{
  "id": "cherry-mx-red",
  "name": "Cherry MX Red",
  "soundFiles": [
    "/sounds/cherry-mx-red.wav",           // 0: 일반 키
    "/sounds/cherry-mx-red-spacebar.wav",  // 1: 스페이스바
    "/sounds/cherry-mx-red-stabilizer.wav" // 2: 스태빌라이저
  ],
  "soundMapping": {
    "default": 0,      // 일반 키는 soundFiles[0]
    "spacebar": 1,     // 스페이스바는 soundFiles[1]
    "enter": 2,        // 엔터는 soundFiles[2]
    "shift": 2,        // 시프트는 soundFiles[2]
    "backspace": 2,    // 백스페이스는 soundFiles[2]
    "stabilizer": 2    // 기타 큰 키는 soundFiles[2]
  }
}
```

**참고**:
- `soundMapping`이 없으면 모든 키가 `soundFiles[0]`을 사용
- 특정 키 타입 매핑이 없으면 `default`로 폴백

## 사용 방법

1. 브라우저에서 앱 열기
2. "오디오 시작" 버튼 클릭 (AudioContext 활성화)
3. 왼쪽 사이드바에서 스위치 선택
4. 키보드 입력 시 선택한 스위치의 사운드 재생

## 트러블슈팅

### 소리가 안 들려요

1. **사운드 파일 확인**: `public/sounds/` 폴더에 WAV 파일이 있는지 확인
2. **콘솔 확인**: 브라우저 개발자 도구(F12)에서 에러 메시지 확인
3. **AudioContext 확인**: "오디오 시작" 버튼을 눌렀는지 확인
4. **스위치 선택 확인**: 왼쪽에서 스위치를 선택했는지 확인
5. **볼륨 확인**: 볼륨이 0이 아닌지 확인

### 로딩 에러가 나요

- 사운드 파일 경로를 확인하세요
- `public/data/switches.json`의 `soundFiles` 경로와 실제 파일명이 일치하는지 확인
- 브라우저 콘솔에 자세한 에러 메시지가 표시됩니다

## 확장 가능성

현재 구조는 다음과 같은 확장을 쉽게 지원합니다:

- **하우징/키캡 옵션**: `domain/housing`, `domain/keycap` 추가
- **멀티 샘플**: 키 위치별, 벨로시티별 다른 사운드
- **이펙트 체인**: 리버브, EQ 등 추가 오디오 이펙트
- **백엔드 통합**: `RemoteSwitchAdapter`로 API 연동

## License

The source code is licensed under the MIT License.
Sound assets are proprietary and not licensed for reuse.
