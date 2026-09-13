# generate-exports 사용 안내

[scripts/generate-exports.mjs](../scripts/generate-exports.mjs)는 아이콘과 일러스트레이션 SVG 목록으로 export 파일을 재생성하는 스크립트입니다.

> **`src/icons/index.ts`와 `src/illustrations/index.ts`는 직접 수정하지 않습니다.**
> SVG 파일을 변경한 뒤 스크립트로 갱신합니다. 직접 수정한 내용은 다음 실행 시 덮어써집니다.

---

## 1. 사용 목적

`src/icons/index.ts`, `src/illustrations/index.ts`는 패키지의 public export입니다.
SVG 파일을 추가하거나 삭제해도 이 파일들은 자동으로 바뀌지 않으므로, 실제 파일 목록과 export를 맞춰야 합니다.

export가 맞지 않으면 패키지 빌드나 `@snorose/icons`를 사용하는 프로젝트의 import가 깨질 수 있습니다.

---

## 2. 실행 시점

- `src/icons/basic/` 또는 `src/icons/multi/`의 아이콘을 추가·삭제하거나 파일명·경로를 변경한 뒤
- `src/illustrations/`의 일러스트레이션을 추가·삭제하거나 파일명·경로를 변경한 뒤
- PR을 만들기 전 export 누락 여부를 확인할 때

---

## 3. 실행 절차

1. [아이콘 네이밍 가이드](./icon-naming-convention.md)에 따라 SVG 파일을 추가·삭제하거나 이름·경로를 변경합니다.
2. 저장소 루트에서 아래 명령어를 순서대로 실행합니다.

```bash
npm run generate:exports
npm run check
```

- `npm run generate:exports`: 현재 SVG 파일 목록으로 export 파일 재생성
- `npm run check`: 타입 검사, lint, build 검증

### 자동 실행

`npm run build`는 `prebuild`로 export를 자동 생성하며, `npm run check`와 `npm publish`도 빌드 단계에서 이를 실행합니다.
다만 `check`는 타입 검사를 먼저 하므로, SVG 추가/삭제 후에는 위 순서대로 export를 갱신하고 검증합니다.

---

## 4. 체크리스트

- [ ] 생성된 `index.ts`를 직접 수정하지 않고 스크립트로 갱신했는가
- [ ] 삭제한 SVG의 export가 함께 제거되었는가
- [ ] 추가한 SVG의 export가 생성되었는가
- [ ] 변경한 SVG 파일명·경로가 export에 반영되었는가
- [ ] `npm run check`가 통과했는가
