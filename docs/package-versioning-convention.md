# VERSIONING

아이콘 패키지(`@snorose/icons`)의 버전 관리 기준과 릴리즈 절차를 정의한다.

> 본 문서는 Semantic Versioning 2.0.0(SemVer)을 기반으로 한다.
>
> 아이콘 패키지의 특성을 고려해 일부 규칙을 프로젝트 정책으로 정의하며,
> SemVer와 다른 부분은 부록 A에서 명시한다.

---

## 1. 버전 체계

버전은 다음 형식을 따른다.

```text
MAJOR.MINOR.PATCH
```

예시:

```text
1.4.2
│ │ └── PATCH
│ └──── MINOR
└────── MAJOR
```

### 기본 규칙

- 최초 정식 릴리즈는 `1.0.0`이다.
- 정식 배포 전 개발 버전은 `0.0.0`을 유지한다.
- 정식 배포 전 테스트가 필요하면 prerelease 버전을 사용한다.
  - 예: `1.0.0-beta.1`
- 상위 버전이 증가하면 하위 버전은 `0`으로 초기화한다.
  - `1.4.2 → 1.5.0`
  - `1.5.0 → 2.0.0`
- 이미 배포된 버전은 수정하거나 다시 배포하지 않는다.
- 모든 변경사항은 새로운 버전으로 배포한다.
- Git Tag는 `v1.4.2` 형식을 사용한다.

---

## 2. 버전 판정 규칙

한 릴리즈에 여러 변경사항이 포함되면 가장 높은 등급 하나를 적용한다.

```text
MAJOR > MINOR > PATCH
```

예시:

- 아이콘 추가 + 버그 수정 → **MINOR**
- Import 경로 변경 + 아이콘 추가 → **MAJOR**

### 판정 순서

1. 패키지 구조, 공개 API 또는 Import 경로가 변경되었는가?
   → YES: **MAJOR**
2. 아이콘 추가·삭제·이름 변경·의도적인 디자인 변경이 있는가?
   → YES: **MINOR**
3. 기존 동작을 유지하기 위한 수정인가?
   → YES: **PATCH**

---

### MAJOR

패키지 구조, 공개 API 또는 사용 방식에 호환되지 않는 변경이 발생한 경우 올린다.

#### Examples

- 파일 또는 디렉터리 구조 변경
- 공개 Import 경로 변경
- export 이름 또는 export 방식의 전면 변경
- 패키지 사용 방식 변경
- 아이콘 패키지 구조 전면 개편

예시:

```text
1.5.2 → 2.0.0
```

---

### MINOR

아이콘 자산이 추가되거나 소비자가 인지해야 하는 시각적 변경이 발생한 경우 올린다.

#### Examples

- 새로운 아이콘 추가
- 기존 아이콘 삭제
- 기존 아이콘 이름 변경
- 기존 아이콘의 의도적인 디자인 변경

예시:

```text
1.4.2 → 1.5.0
```

> 본 프로젝트에서는 아이콘 추가·삭제·이름 변경·의도적인 디자인 변경을 모두 MINOR로 관리한다.
>
> 아이콘 삭제와 이름 변경을 MINOR로 처리하는 것은 SemVer와 다른 프로젝트 정책이다.
> 자세한 내용은 부록 A를 참고한다.

---

### PATCH

공개 API나 의도된 디자인을 변경하지 않는 수정이 발생한 경우 올린다.

#### Examples

- 잘못된 SVG Path 수정
- 잘못된 ViewBox 수정
- Fill / Stroke 오류 수정
- 아이콘 렌더링 버그 수정
- 문서 수정
- 공개 API에 영향을 주지 않는 내부 빌드 설정 수정

예시:

```text
1.5.1 → 1.5.2
```

### 디자인 변경과 버그 수정의 구분

다음 기준으로 MINOR와 PATCH를 구분한다.

- 기존 디자인을 **의도적으로 바꾼다** → MINOR
- 의도한 디자인과 **다르게 표시되는 문제를 바로잡는다** → PATCH

예시:

| 케이스 | 분류 |
|--------|------|
| 아이콘 모양 자체를 새 디자인으로 교체 | MINOR |
| 잘못 잘린 Path, 잘못된 ViewBox, 누락된 Stroke 수정 | PATCH |

---

## 3. 최초 릴리즈 전 확인

현재 개발 버전 `0.0.0`에서 최초 정식 버전 `1.0.0`을 배포하기 전에 다음 항목을 확인한다.

- [ ] npm 패키지 이름 확정 (`@snorose/icons`)
- [ ] `package.json`의 `private` 설정 해제
- [ ] scoped package의 공개 범위 결정
- [ ] `publishConfig` 설정
- [ ] 배포 대상 파일 확인
- [ ] 빌드 결과물과 export 경로 확인
- [ ] npm 배포 권한 및 2FA 설정 확인

공개 scoped package로 배포한다면 다음과 같이 설정한다.

```json
{
  "name": "@snorose/icons",
  "private": false,
  "publishConfig": {
    "access": "public"
  }
}
```

> 실제 npm 배포 전에는 패키지명과 공개 범위를 팀에서 확정해야 한다.

---

## 4. 릴리즈 절차

### 4.1 릴리즈 준비

버전을 올리기 전에 다음 작업을 완료한다.

1. 릴리즈에 포함될 PR을 모두 병합한다.
2. `CHANGELOG.md`를 작성하고 반영한다.
3. 의존성을 설치하고 검증한다.
4. 배포 대상 파일을 확인한다.
5. Git working tree가 깨끗한지 확인한다.

```bash
npm ci
npm run typecheck
npm run build
npm pack --dry-run
git status
```

> `npm version`은 기본적으로 working tree가 깨끗하지 않으면 실패한다.

---

### 4.2 버전 변경

Patch Release:

```bash
npm version patch
```

Minor Release:

```bash
npm version minor
```

Major Release:

```bash
npm version major
```

최초 정식 릴리즈:

```bash
npm version 1.0.0
```

최초 Prerelease:

```bash
npm version 1.0.0-beta.1
```

이후 Prerelease 증가:

```bash
npm version prerelease --preid=beta
```

`npm version`이 지원하는 prerelease 동작은 [npm 공식 문서](https://docs.npmjs.com/cli/v10/commands/npm-version/)에서 확인할 수 있다.

`npm version`은 기본적으로 다음 작업을 수행한다.

- `package.json`의 version 변경
- `package-lock.json`의 version 변경
- 버전 커밋 생성
- Git Tag 생성 (예: `v1.5.0`)

> `npm version`은 버전 커밋과 Git Tag를 생성하지만 원격 저장소에 push하지는 않는다.

---

### 4.3 npm 배포

```bash
npm publish
```

`publishConfig.access`를 설정하지 않은 공개 scoped package라면 다음 명령이 필요할 수 있다.

```bash
npm publish --access public
```

배포 전에 실제 포함 파일을 확인하려면 다음 명령을 사용한다.

```bash
npm pack --dry-run
```

---

### 4.4 버전 커밋과 Tag Push

npm 배포가 성공한 후 버전 커밋과 Tag를 원격 저장소에 push한다.

```bash
git push --follow-tags
```

> `npm publish`와 `git push` 중 하나만 성공한 경우 저장소와 npm 버전 상태가 달라질 수 있다.
> 명령 실행 결과를 각각 확인하고, 실패 시 아래 복구 절차를 따른다.

#### 실패 시 복구

**`npm publish`가 실패한 경우**

원인을 해결한 뒤 동일한 버전으로 배포를 다시 시도한다. 배포가 성공하기 전에는 버전 커밋과 Tag를 push하지 않는다.

```bash
npm publish
```

**`npm publish`는 성공했지만 `git push`가 실패한 경우**

push 실패 원인을 해결한 뒤 다시 실행한다. `npm version`이나 `npm publish`를 다시 실행하지 않는다.

```bash
git push --follow-tags
```

**잘못된 버전을 배포한 경우**

배포된 버전은 수정하거나 덮어쓸 수 없다. 해당 버전을 deprecate 처리하고 새로운 버전으로 다시 배포한다.

```bash
# 잘못 배포된 버전을 사용 중단 표시
npm deprecate @snorose/icons@1.5.0 "잘못 배포된 버전입니다. 1.5.1을 사용하세요."

# 수정 후 새 버전으로 배포
npm version patch
npm publish
git push --follow-tags
```

> `npm unpublish`는 [npm 정책에서 정한 조건](https://docs.npmjs.com/policies/unpublish/)을 충족할 때만 사용할 수 있다.
> 배포 후 72시간 이내라도 의존하는 공개 패키지가 없어야 하며, 72시간 이후에는 다운로드 수, 의존 패키지, 소유자 수 등의 추가 조건이 적용된다.
>
> unpublish한 버전도 동일한 `package@version`으로 다시 배포할 수 없으므로, 일반적인 오류 수정에는 deprecate와 새 버전 배포를 우선한다.

---

## 5. CHANGELOG

모든 릴리즈는 `CHANGELOG.md`에 변경사항을 기록한다.

예시:

```markdown
## 1.5.0

### Added

- calendar
- bell

### Changed

- search 아이콘 디자인 수정

### Fixed

- image 아이콘 ViewBox 수정

### Removed

- legacy-badge
```

아이콘 삭제 또는 이름 변경 시에는 가능하면 대체 아이콘을 함께 기록한다.

예시:

```markdown
### Removed

- `legacy-badge`
  - 대체 아이콘: `badge`
```

---

## 6. Changesets

패키지 규모가 커지거나 릴리즈 빈도가 증가하면 Changesets 도입을 검토한다.

도입 시 기대 효과:

- 변경사항 기록
- 버전 자동 계산
- CHANGELOG 생성
- 여러 PR의 릴리즈 정보 관리
- npm 배포 자동화

설치 예시:

```bash
npm install -D @changesets/cli
npx changeset init
```

사용 예시:

```bash
npx changeset
npx changeset version
npx changeset publish
```

> Changesets를 도입하면 `npm version` 기반 수동 릴리즈 절차를 대체할 수 있다.
> 두 방식을 동시에 운영하지 않는다.

---

## 부록 A. SemVer와 다른 프로젝트 정책

본 프로젝트는 Semantic Versioning 2.0.0을 기반으로 하지만,
아이콘 패키지의 특성을 고려해 다음 규칙을 별도로 적용한다.

| 변경사항 | SemVer 기준 | 프로젝트 규칙 |
|----------|-------------|---------------|
| 아이콘 추가 | MINOR | MINOR |
| 아이콘 삭제 | MAJOR | **MINOR** |
| 아이콘 이름 변경 | MAJOR | **MINOR** |
| 의도적인 디자인 변경 | 명확한 규정 없음 | **MINOR** |
| SVG Path 오류 수정 | PATCH | PATCH |
| ViewBox 오류 수정 | PATCH | PATCH |
| Fill / Stroke 오류 수정 | PATCH | PATCH |
| 문서 수정 | PATCH | PATCH |

### 운영 배경

SemVer는 공개 API의 호환성을 기준으로 버전을 관리한다.

아이콘 패키지는 API뿐 아니라 시각적 변경도 소비자에게 영향을 줄 수 있다.
따라서 본 프로젝트에서는 아이콘 추가·삭제·이름 변경·의도적인 디자인 변경을 모두 MINOR로 관리한다.

### 호환성 위험

아이콘 삭제 또는 이름 변경을 MINOR로 배포하면,
`^` 범위로 의존하는 프로젝트가 해당 변경을 자동으로 받을 수 있다.

예시:

```json
{
  "dependencies": {
    "@snorose/icons": "^1.4.0"
  }
}
```

이 경우 `1.5.0`이 자동 설치될 수 있으며,
삭제되거나 이름이 변경된 아이콘을 사용하고 있다면 빌드 오류가 발생할 수 있다.

따라서 아이콘 삭제 또는 이름 변경 시에는 다음 사항을 확인한다.

- 실제 사용처가 남아 있는지 확인
- 가능한 경우 대체 아이콘 안내
- `CHANGELOG.md`에 변경사항 기록
- 필요한 경우 deprecated 기간 운영
- 영향이 크면 MAJOR 변경 적용 검토

> MINOR 분류는 기본 프로젝트 정책이며, 실제 영향 범위가 크면 MAJOR로 올릴 수 있다.

---

## 참고 문헌

- Semantic Versioning 2.0.0
  <https://semver.org/lang/ko/>
- About semantic versioning
  <https://docs.npmjs.com/about-semantic-versioning>
- npm version
  <https://docs.npmjs.com/cli/v11/commands/npm-version>
- npm publish
  <https://docs.npmjs.com/cli/v11/commands/npm-publish>
- Changesets
  <https://github.com/changesets/changesets>
