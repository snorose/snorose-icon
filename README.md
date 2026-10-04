# @snorose/icons

[![npm version](https://img.shields.io/npm/v/@snorose/icons)](https://www.npmjs.com/package/@snorose/icons)

스노로즈에서 사용하는 아이콘과 일러스트레이션을 React 컴포넌트 형태로 제공하는 패키지입니다.

[스토리북에서 아이콘 보기 ↗](https://storybook.snorose.com/?path=/docs/foundations-iconography--docs)

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

### 색상 지정

`color` prop 또는 CSS의 `color` 속성을 통해 색상을 변경할 수 있습니다.

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

## Docs

- [@snorose-icons/naming-convention](docs/icon-naming-convention.md)
- [@snorose-icons/versioning-convention](docs/package-versioning-convention.md)
- [@snorose-icons/management](docs/icon-management.md)
- [@snorose-icons/release](docs/release-guide.md)

## Contributors

[![기여자 프로필](https://contrib.rocks/image?repo=snorose/snorose-icon)](https://github.com/snorose/snorose-icon/graphs/contributors)

## License

This project is licensed under the [MIT License](LICENSE).
