## Release

저장소 변수 `RELEASE_AUTOMATION_ENABLED=true`인 상태에서 `dev → main` PR을 병합하면
[Release Package](../.github/workflows/release.yml)가 아래 과정을 실행한다.

1. minor 버전 업데이트 및 릴리스 노트 생성
2. 검증 후 버전 커밋·태그를 main에 저장
3. npm 배포 및 GitHub Release 생성
4. dev 동기화 PR 생성 및 자동 병합 예약 — 필수 검사·리뷰 조건 충족 후 병합

변수 미설정 또는 `false`이면 릴리스 작업 전체를 건너뛴다.
일반 PR의 TypeScript·번들·릴리스 스크립트 검사는 계속 실행된다.
자동화 활성 상태에서는 버전을 수동으로 올리지 않는다.
비활성 상태의 수동 배포 및 Major/Patch 배포는 [버전 관리 기준](package-versioning-convention.md)을 따른다.

### 관리자 최초 설정

GitHub 쓰기 권한과 npm 배포 인증은 별도 설정이다. 모두 준비한 후 자동화를 활성화한다.

- **GitHub App**: 저장소에 설치하고 Contents·Pull requests 읽기/쓰기 권한 부여
  - Actions Secrets에 `BOT_APP_ID`·`BOT_PRIVATE_KEY` 등록 (필수)
  - 동기화 PR의 CI가 자동 실행되도록 App 토큰 사용. `GITHUB_TOKEN` 대체 인증 미사용
- **main·태그 규칙**: 릴리스 App이 main 버전 커밋과 `v*` 태그를 push할 수 있도록 설정
  - 기존 실패 원인: `GH013: Changes must be made through a pull request`로 main 직접 push 거부
  - Contents 쓰기 권한만으로 보호 규칙을 우회할 수 없으므로 App에 필요한 main·태그 규칙 예외 설정
  - 일반 사용자의 main 보호 규칙은 유지
- **자동 병합**: Settings → General → Pull Requests에서 Allow auto-merge와 Allow squash merging 활성화
- **dev 보호 규칙**: PR Quality Check의 릴리스 검사·TypeScript·번들 검사를 필수 검사로 지정
  - 릴리스 App도 dev 필수 검사를 통과하도록 설정 (dev 검사 우회 권한 부여 금지)
  - 필수 리뷰가 있으면 리뷰 완료까지 대기. 수동 리뷰 없이 운영하려면 동기화 PR에 적용할 리뷰 정책 별도 설정
  - 충돌·검사 실패 시 병합하지 않고 PR을 열린 상태로 유지
- **npm**: `@snorose/icons` Settings → Trusted publishing에 GitHub Actions 등록
  - 저장소: `snorose/snorose-icon`, 워크플로: `release.yml`
  - Environment: 비워 둠, `npm publish` 허용
  - `NPM_TOKEN` 없이 인증 ([공식 문서](https://docs.npmjs.com/trusted-publishers/))

자동 병합은 GitHub의 필수 검사·리뷰 조건을 따른다 ([공식 문서](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/automatically-merging-a-pull-request)).

### 전체 자동화 활성화

Settings → Secrets and variables → Actions → **Variables**에
`RELEASE_AUTOMATION_ENABLED`를 추가하고 값을 `true`로 설정한다 (Secret이 아닌 저장소 변수).
기존 `NPM_PUBLISH_ENABLED`는 더 이상 사용하지 않으므로 삭제할 수 있다.

변수 변경만으로 실행되지는 않으며 다음 `dev → main` 병합부터 전체 자동화가 실행된다.
비활성 상태에서 건너뛴 실행의 소급 릴리스는 지원하지 않으며, 활성화 후 최신 dev → main PR을 병합한다.

### 실패 시

코드 변경 없이 권한·설정 문제만 해결했다면 해당 Actions 실행의 **Re-run all jobs**로 재시도한다.
기존 실행에는 당시 워크플로가 적용되므로 이번 변경 이전 실행에는 새 변수·자동 병합 로직이 적용되지 않는다.
이미 저장된 버전은 재사용하고, 동일한 패키지가 npm에 있으면 배포를 건너뛴다.
단, 버전 커밋 저장 전에 main이 전진했다면 최신 dev → main PR로 릴리스한다.

동기화 PR 생성 후 자동 병합 예약이 실패해도 PR을 보존한다.
설정을 해결하고 재실행하면 기존 열린 PR에 자동 병합을 다시 예약한다.
충돌·검사 실패는 직접 해결하며, 다음 배포 전에 이전 dev 동기화가 완료되었는지 확인한다.
