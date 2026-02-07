# i18n/

next-intl 기반 국제화 설정. 한국어(ko, 기본)와 영어(en)를 지원한다.

## 파일 구조

- `constants.ts` - 로케일(`ko`, `en`), 네임스페이스(`common`, `home`, `soundTest`) 상수
- `routing.ts` - next-intl 라우팅 설정
- `request.ts` - 서버사이드 메시지 로드 설정

## 관련 디렉토리

- `messages/ko/`, `messages/en/` - 번역 JSON 파일 (네임스페이스별 분리)
- `src/middleware.ts` - 로케일 감지 미들웨어
- `src/app/[locale]/` - 로케일 기반 동적 라우팅
