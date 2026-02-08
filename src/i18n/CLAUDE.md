# i18n/

next-intl 기반 국제화 설정. 한국어(ko, 기본)와 영어(en)를 지원한다.

## 파일 구조

- `constants.ts` - 로케일(`ko`, `en`), 네임스페이스(`common`, `home`, `soundTest`) 상수
- `routing.ts` - next-intl 라우팅 설정
- `request.ts` - 서버사이드 메시지 로드 설정

## 주의사항

- `localePrefix: 'never'` — URL에 `/ko`, `/en` 프리픽스 미표시. 미들웨어가 브라우저 언어 기반 자동 감지
- 기본 로케일: `ko` (한국어), 보조: `en` (영어)
- 모든 네임스페이스(`common`, `home`, `soundTest`)를 `Promise.all`로 병렬 로딩
- 미들웨어 매처: API 라우트, `_next` 내부 경로, 정적 파일(확장자 있는 경로) 제외

## 관련 디렉토리

- `messages/ko/`, `messages/en/` - 번역 JSON 파일 (네임스페이스별 분리)
- `src/middleware.ts` - 로케일 감지 미들웨어
- `src/app/[locale]/` - 로케일 기반 동적 라우팅
