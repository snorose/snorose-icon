# Playground 반영 안내

아이콘과 일러스트레이션은 **SVG 변경 → export 생성 및 패키지 빌드 → playground 실행·빌드** 순서로 반영합니다.

## 1. SVG 추가·수정

> [아이콘 네이밍 가이드](./icon-naming-convention.md)에 따라 해당 폴더에 SVG를 추가하거나 수정합니다.

| 종류            | 폴더                 | 파일명 예시              | 컴포넌트명 예시       |
| --------------- | -------------------- | ------------------------ | --------------------- |
| 기본 아이콘     | `src/icons/basic/`   | `ic-basic-search.svg`    | `IconSearch`          |
| 멀티컬러 아이콘 | `src/icons/multi/`   | `ic-multi-bell-blue.svg` | `IconMultiBellBlue`   |
| 일러스트레이션  | `src/illustrations/` | `il-padlock.svg`         | `IllustrationPadlock` |

Playground는 `@snorose/icons`의 export를 읽고 이름에 따라 자동으로 분류합니다.

- Basic Icon: `Icon`으로 시작하고 `IconMulti`로 시작하지 않는 컴포넌트
- Multi Icon: `IconMulti`로 시작하는 컴포넌트
- Illustration: `Illustration`으로 시작하는 컴포넌트

기존 분류에 SVG를 추가할 때는 playground 화면에 개별 컴포넌트를 등록할 필요가 없습니다.

## 2. 패키지 빌드 후 로컬 확인

> 모든 명령은 저장소 루트에서 실행합니다. 처음 설치하거나 의존성이 변경되었다면 먼저 `npm ci`를 실행합니다.

```bash
npm run build
npm run playground
```

`npm run build`는 `prebuild` 단계에서 export 파일을 자동 생성한 뒤 `dist/`에 패키지를 빌드합니다.
Playground는 이 저장소의 패키지 설정을 통해 `dist/index.js`를 읽으므로, SVG 변경 후 패키지 빌드가 필요합니다.
개발 서버가 출력하는 로컬 주소에 접속하여 해당 섹션에 표시되는지 확인합니다.

`src/icons/index.ts`와 `src/illustrations/index.ts`는 직접 수정하지 않습니다.
export 생성 및 검증 절차는 [generate-exports 사용 안내](./generate-exports-guide.md)를 참고합니다.

## 3. Playground 빌드 결과 로컬 확인

> 정적 사이트로 빌드한 결과가 정상 동작하는지 확인할 때 사용합니다.  
> 로컬에서 아이콘만 확인한다면 **2번만으로 충분하므로 이 단계는 생략해도 됩니다.**

```bash
npm run build
npm run playground:build
npm run playground:preview
```

- `build`: playground에서 사용할 최신 패키지 생성
- `playground:build`: 정적 사이트 생성. 패키지 빌드는 별도로 먼저 실행해야 함
- `playground:preview`: 생성된 사이트를 로컬에서 확인

현재 [Vite 설정](../vite.config.ts)은 `root: 'playground'`, `outDir: 'playground-dist'`이므로,
사이트 출력 경로는 저장소 루트 기준 **`playground/playground-dist/`**입니다.
패키지 출력 폴더인 `dist/`와 구분합니다.

## 4. 반영되지 않을 때

- 로컬에서 보이지 않으면 `npm run build`로 export와 `dist/`를 갱신한 뒤 개발 서버를 재시작합니다.
- 잘못된 섹션에 표시되면 SVG 파일명과 생성된 컴포넌트 접두사를 확인합니다.
