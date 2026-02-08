# core/

프레임워크 독립적인 핵심 로직. React 의존성 없이 순수 TypeScript로 구현된 오디오 엔진과 사운드 에셋 관리 모듈.

## 파일 구조

- `audio/engine/` - AudioContext 싱글톤 관리(`AudioEngine`), 오디오 노드 연결 그래프(`AudioGraph`)
- `audio/player/` - 사운드 재생(`createSoundPlayer`), 폴리포닉 보이스 풀(`createVoicePool`, 최대 32 동시 발음)
- `audio/effects/` - Gain 노드(`createVolumeNode`), 다이내믹 컴프레서(`createCompressorNode`)
- `sound/loader/` - WAV 파일 fetch + decode(`createSoundLoader`), 프리로드 전략(`executePreloadStrategy`)
- `sound/cache/` - LRU 캐시(`createSoundCache`, `createLRUCacheStrategy`)
- `sound/registry/` - 사운드 에셋 메타데이터 레지스트리(`createSoundRegistry`)

## 패턴

- 대부분 `createXxx()` 팩토리 함수로 인스턴스 생성, 클로저로 내부 상태 캡슐화
- **예외**: `AudioEngine`은 싱글톤 클래스 (`AudioEngine.getInstance()`)
- barrel export(`index.ts`)로 public API만 노출
- 오디오 그래프 흐름: SourceNode → VolumeNode → CompressorNode → destination

## 주의사항

- VoicePool 최대 동시 발음: 32, SoundCache/LRU 최대: 50 항목
- SoundCache 메모리 추적: `channels × samples × 4 bytes` (Float32)
- VolumeNode를 `context.destination`에 연결하지 않으면 소리 미출력

## 관련 디렉토리

- `src/domain/` - core의 오디오/사운드 API를 사용하는 비즈니스 로직
- `src/features/sound-controller/` - core를 React 훅으로 래핑
