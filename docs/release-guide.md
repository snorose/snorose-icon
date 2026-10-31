## Release

`dev → main` PR을 병합하면 [Release Package](../.github/workflows/release.yml)가 자동 실행된다.

1. minor 버전 업데이트 (`1.3.0 → 1.4.0`) 및 릴리스 노트 생성
2. `npm run ci` 검증 후 버전 커밋·태그 저장
3. `NPM_PUBLISH_ENABLED=true`일 때만 npm 배포, GitHub Release는 항상 생성
4. dev 동기화 PR 생성 — 다음 배포 전에 병합

일반 개발 PR에서는 버전을 수동으로 올리지 않는다.
Major/Patch 배포는 [버전 관리 기준](package-versioning-convention.md)의 수동 절차를 따른다.

### 최초 설정

- **npm**: `@snorose/icons` Settings → Trusted publishing에 GitHub Actions 등록
  - 저장소: `snorose/snorose-icon`, 워크플로: `release.yml`
  - Environment: 비워 둠, `npm publish` 허용
  - `NPM_TOKEN` 없이 인증. 실제 배포 직전에 등록 ([공식 문서](https://docs.npmjs.com/trusted-publishers/))
- **GitHub**: Actions의 PR 생성 허용 및 main·`v*` 보호 규칙에서 봇의 커밋·태그 생성 허용
  - `BOT_APP_ID`·`BOT_PRIVATE_KEY`가 있으면 GitHub App 사용 (Contents·Pull requests 쓰기 권한 필요)
  - 없으면 `GITHUB_TOKEN` 사용. 이 경우 동기화 PR의 CI는 자동 실행되지 않음

### npm 자동 배포 활성화

GitHub 저장소 Settings → Secrets and variables → Actions → **Variables**에
`NPM_PUBLISH_ENABLED`를 추가하고 값을 `true`로 설정한다 (Secret이 아닌 저장소 변수).
권한 설정이 끝나기 전에는 변수를 만들지 않거나 `false`로 둔다.
이 경우 npm 조회·배포를 건너뛰며 버전업, 태그, GitHub Release, dev 동기화 PR은 계속 진행한다.
GitHub Release에는 npm 배포를 건너뛰었다고 표시한다.

변수 변경만으로 배포가 실행되지는 않는다. 활성화 이후 다음 `dev → main` 병합부터 npm에 배포된다.
이전에 건너뛴 버전은 자동으로 소급 배포하지 않는다.
이 변경이 반영된 워크플로에서 건너뛴 버전은 권한 설정 후 해당 **Release Package → Re-run all jobs**로 재실행할 수 있다.
변경 이전 실행의 재실행에는 새 조건이 적용되지 않는다.
이때 기존 버전 커밋과 태그를 재사용하며, 기존 GitHub Release 본문은 보존되므로 npm 안내는 직접 수정한다.

### 실패 시

원인을 해결한 뒤 Actions → **Release Package → Re-run all jobs**로 재시도한다.
이미 저장된 버전은 재사용하고, 동일한 패키지가 npm에 있으면 배포를 건너뛴다.
코드 수정이 필요하면 새 dev → main PR로 배포한다.
Dev 동기화 충돌은 직접 해결하며, 다음 배포는 이전 배포·동기화가 끝난 뒤 진행한다.
