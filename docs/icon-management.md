## Adding New Icon

새로운 아이콘은 다음 순서로 추가합니다.

### 1. SVG 전달

디자인팀에서 Figma SVG를 전달받습니다.

### 2. 적절한 디렉터리에 추가

Basic Icon:

```text
src/icons/basic
```

Multi Icon:

```text
src/icons/multi
```

Illustration:

```text
src/illustrations
```

### 3. Naming Convention 적용

파일명을 해당 에셋 종류의 Naming Convention에 맞춥니다.

예:

```text
ic-basic-search.svg
ic-basic-heart-fill.svg
ic-multi-bell-blue.svg
il-empty-state.svg
```

### 4. SVG 정리

#### Basic Icon

Basic Icon은 외부에서 색상을 변경할 수 있도록 `currentColor`를 사용합니다.

```svg
<path fill="currentColor" />
```

또는:

```svg
<path stroke="currentColor" />
```

특정 색상을 Basic Icon 내부에 직접 지정하지 않는 것을 원칙으로 합니다.

```svg
<!-- 지양 -->
<path fill="#898989" />
```

#### Multi Icon

Multi Icon은 디자인 자체에 여러 색상이 포함된 경우 고정 색상을 사용할 수 있습니다.

```svg
<path fill="#F7A8B8" />
<path fill="#6A8DFF" />
```

gradient 역시 필요한 경우 유지할 수 있습니다.

#### SVG 공통

새로운 SVG를 추가할 때 다음을 확인합니다.

- 불필요한 Figma 전용 속성이 없는지
- 불필요한 `id`가 없는지
- 불필요한 inline style이 없는지
- 사용되지 않는 `filter`가 없는지
- `viewBox`가 올바르게 존재하는지
- 파일명이 Naming Convention을 따르는지

### 5. Export 생성

export 파일은 직접 수정하지 않습니다.

다음 명령을 실행합니다.

```bash
npm run generate:exports
```

또는 build 과정에서 export 생성이 포함되어 있다면:

```bash
npm run build
```

생성 스크립트가 파일명을 기준으로 React 컴포넌트 export를 생성합니다.

```text
ic-basic-* → Icon*
ic-multi-* → IconMulti*
il-*       → Illustration*
```

### 6. 검증

추가한 아이콘이 정상적으로 build되고 export되는지 확인합니다.

```bash
npm run typecheck
npm run lint
npm run build
npm run smoke
npm run pack:check
```

전체 검증은 다음 명령으로 실행할 수 있습니다.

```bash
npm run ci
```
