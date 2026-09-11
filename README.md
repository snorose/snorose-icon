# @snorose/icons

스노로즈에서 사용하는 아이콘과 일러스트레이션을 React 컴포넌트 형태로 제공하는 패키지입니다.

패키지는 다음 세 종류의 에셋을 제공합니다.

- **Basic Icon**: 단색 아이콘
- **Multi Icon**: 여러 색상을 사용하는 아이콘
- **Illustration**: 일러스트레이션

## Installation

```bash
npm install @snorose/icons
```

React 18 또는 19 환경을 지원합니다.

```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  }
}
```

## Usage

모든 아이콘과 일러스트레이션은 package root에서 named export됩니다.

```tsx
import { IconSearch } from '@snorose/icons';

function SearchButton() {
  return <IconSearch />;
}
```

### 크기 지정

별도의 `size` prop은 제공하지 않습니다.

SVG의 `width`, `height`를 사용해 크기를 지정합니다.

```tsx
import { IconSearch } from '@snorose/icons';

function SearchButton() {
  return <IconSearch width={24} height={24} />;
}
```

---

### 색상 지정

Basic Icon은 `currentColor`를 사용하는 것을 기본 규칙으로 합니다.

따라서 `color` prop 또는 CSS의 `color` 속성을 통해 색상을 변경할 수 있습니다.

```tsx
<IconSearch width={24} height={24} color="#000000" />
```

```tsx
<IconSearch className="search-icon" />
```

```css
.search-icon {
  color: #000000;
}
```

Multi Icon과 Illustration은 자체 색상을 가지므로 일반적으로 `color`를 이용해 내부 색상을 변경하지 않습니다.

## Props

아이콘 컴포넌트는 SVG root element에 전달할 수 있는 일반적인 SVG props를 사용할 수 있습니다.

예:

```tsx
<IconSearch
  width={24}
  height={24}
  color="currentColor"
  className="search-icon"
  style={{ flexShrink: 0 }}
  aria-hidden="true"
/>
```

주로 사용하는 props는 다음과 같습니다.

- `width`
- `height`
- `color`
- `className`
- `style`
- `aria-*`
- `role`
- SVG element에서 사용할 수 있는 event handler

별도의 `size` prop과 ref forwarding은 지원하지 않습니다.

## Icon Variants

### Basic Icon

단색 아이콘입니다.

파일 위치:

```text
src/icons/basic
```

Basic Icon은 `fill`과 `stroke`에 `currentColor`를 사용하는 것을 원칙으로 합니다.

```tsx
import { IconHeart } from '@snorose/icons';

<IconHeart color="#FF4D6D" />;
```

---

### Multi Icon

여러 색상을 포함하는 아이콘입니다.

파일 위치:

```text
src/icons/multi
```

Multi Icon은 내부 색상을 유지하기 위해 `currentColor` 대신 고정 색상 또는 gradient를 사용할 수 있습니다.

```tsx
import { IconMultiBellBlue } from '@snorose/icons';

<IconMultiBellBlue />;
```

---

### Illustration

일러스트레이션 에셋입니다.

파일 위치:

```text
src/illustrations
```

```tsx
import { IllustrationExample } from '@snorose/icons';

<IllustrationExample />;
```

실제 export 이름은 해당 SVG 파일명을 기준으로 자동 생성됩니다.

## Naming Convention

아이콘의 파일명은 컴포넌트 export 이름을 결정하므로 반드시 Naming Convention을 지켜야 합니다.

### Basic Icon

파일명:

```text
ic-basic-{name}.svg
```

컴포넌트명:

```text
Icon{Name}
```

예:

```text
ic-basic-search.svg
→ IconSearch
```

---

### Line / Fill

Line 스타일을 기본형으로 사용하며 별도의 `line` suffix를 붙이지 않습니다.

```text
ic-basic-heart.svg
→ IconHeart
```

Fill 스타일에는 `-fill` suffix를 사용합니다.

```text
ic-basic-heart-fill.svg
→ IconHeartFill
```

즉 다음과 같은 형태를 기본으로 합니다.

```text
IconHeart       // line
IconHeartFill   // fill
```

---

### Multi Icon

파일명:

```text
ic-multi-{name}.svg
```

컴포넌트명:

```text
IconMulti{Name}
```

예:

```text
ic-multi-bell-blue.svg
→ IconMultiBellBlue
```

Multi Icon은 필요한 경우 색상이나 variant를 이름 suffix로 표현할 수 있습니다.

```text
IconMultiBellBlue
IconMultiClipboardWhite
```

---

### Illustration

파일명:

```text
il-{name}.svg
```

컴포넌트명:

```text
Illustration{Name}
```

## Adding a New Icon

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

Figma에서 export한 SVG를 그대로 추가하지 않고 필요한 속성을 정리합니다.

특히 Basic Icon은 색상을 외부에서 제어할 수 있도록 `fill`과 `stroke`를 확인합니다.

```svg
fill="currentColor"
stroke="currentColor"
```

Multi Icon과 Illustration은 디자인에 필요한 고정 색상이나 gradient를 유지할 수 있습니다.

불필요한 Figma 관련 속성도 가능한 경우 제거합니다.

예:

```text
불필요한 id
inline style
data-figma-*
사용되지 않는 filter
불필요한 wrapper
```

SVG의 `viewBox`도 반드시 확인합니다.

아이콘 크기를 변경했을 때 정상적으로 비율이 유지되어야 합니다.

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

## SVG Guidelines

### Basic Icon

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

---

### Multi Icon

Multi Icon은 디자인 자체에 여러 색상이 포함된 경우 고정 색상을 사용할 수 있습니다.

```svg
<path fill="#F7A8B8" />
<path fill="#6A8DFF" />
```

gradient 역시 필요한 경우 유지할 수 있습니다.

---

### SVG 공통

새로운 SVG를 추가할 때 다음을 확인합니다.

- 불필요한 Figma 전용 속성이 없는지
- 불필요한 `id`가 없는지
- 불필요한 inline style이 없는지
- 사용되지 않는 `filter`가 없는지
- `viewBox`가 올바르게 존재하는지
- 파일명이 Naming Convention을 따르는지

## Accessibility

아이콘 컴포넌트 자체에서 접근성 속성을 자동으로 지정하지 않습니다.

장식 목적으로만 사용하는 아이콘은 스크린 리더에서 제외할 수 있습니다.

```tsx
<IconSearch aria-hidden="true" />
```

아이콘 자체가 의미를 전달해야 하는 경우 적절한 접근성 정보를 제공해야 합니다.

```tsx
<IconSearch role="img" aria-label="검색" />
```

버튼 내부에서 아이콘을 사용하는 경우에는 가능하면 아이콘 자체보다 버튼에 접근 가능한 이름을 제공합니다.

```tsx
<button type="button" aria-label="검색">
  <IconSearch aria-hidden="true" />
</button>
```

## Release

<!-- 배포 파이프라인 미정 -->

아직 논의 중입니다.

## Versioning

Semantic Versioning을 따릅니다.

### Patch

기존 API를 유지하면서 발생하는 수정.

예:

- 잘못된 SVG 수정
- 아이콘 렌더링 오류 수정
- 기존 동작을 변경하지 않는 내부 수정

### Minor

기존 API를 깨뜨리지 않는 기능 추가.

예:

- 새로운 아이콘 추가
- 새로운 Illustration 추가

### Major

기존 사용 코드에 영향을 줄 수 있는 Breaking Change.

예:

- 기존에 공개된 아이콘 제거
- 기존 public API 제거 또는 호환되지 않는 변경

**기존에 공개된 아이콘의 삭제는 major version에서만 수행합니다.**
