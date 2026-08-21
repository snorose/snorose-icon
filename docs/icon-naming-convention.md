# 아이콘 네이밍 가이드

`snorose-icon` 라이브러리에 아이콘과 일러스트레이션을 추가할 때 공통으로 따르는 네이밍 규칙입니다.
디자이너 없이도 일관된 이름을 붙일 수 있도록, **생김새(형태) 기준**으로 판단합니다.

> 이 문서는 팀 회의에서 확정된 규칙을 기준으로 합니다. 레퍼런스(Heroicons/Lucide 등)의 관례를 참고하되,
> 충돌하는 부분은 아래 규칙을 우선합니다.

---

## 0. 이 프로젝트의 핵심 결정 (요약)

| 결정 사항                     | 내용                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **스타일 구분 방식**          | `variant` prop이 **아님**. **line이 기본(접미사 없음)**, **면(fill) 형태만 `Fill` suffix**                                |
| **단색 아이콘 (`basic`)**     | 컴포넌트 접두사 `Icon`. 새 SVG는 `currentColor`를 사용하며 line = 접미사 없음 / fill = `Fill` suffix                      |
| **멀티컬러 아이콘 (`multi`)** | 컴포넌트 접두사 `IconMulti`. 색상 하드코딩, `Fill` 스타일 접미사 없음. 색상 변형은 색상 접미사 허용 (`IconMultiBellBlue`) |
| **컴포넌트 케이스**           | PascalCase (`IconArrowRight`, `IconArrowRightFill`, `IconMultiBellPink`)                                                  |
| **SVG 파일 케이스**           | kebab-case, 소문자 + 하이픈 (`ic-basic-arrow-right.svg`)                                                                  |
| **파일 접두사**               | 아이콘 `ic-` / 일러스트레이션 `il-`                                                                                       |
| **네이밍 기준**               | 아이콘의 **생김새**로 결정 (쓰이는 위치·용도로 짓지 않음)                                                                 |

```tsx
// 단색 — line은 접미사 없음(기본), fill만 Fill suffix
<IconHeart />       // line (기본)
<IconHeartFill />   // fill (면)

// 멀티컬러 — IconMulti 접두사, 스타일 suffix 없음, 내부 색상 변경 불가
<IconMultiFlag />
<IconMultiShare />
```

---

## 1. 폴더 구조

이 저장소의 폴더 구조도 이 기준을 따릅니다.

```
src/
├── icons/
│   ├── basic/            # ic-basic-*.svg → Icon* 컴포넌트
│   └── multi/            # ic-multi-*.svg → IconMulti* 컴포넌트
└── illustrations/        # 일러스트레이션
```

---

## 2. Icon 네이밍

### 2-1. 네이밍 구조

```
Icon[Multi] + [Object] + [Direction] + [State/Form] + [Quantity/Size] + [Container] + [Style]
```

| 요소                | 설명                                                | 필수 | 예시                               |
| ------------------- | --------------------------------------------------- | ---- | ---------------------------------- |
| **Icon[Multi]**     | `basic`은 `Icon`, `multi`는 `IconMulti` 접두사      | ✅   | `Icon`, `IconMulti`                |
| **[Object]**        | 아이콘의 주요 형태/의미. 여러 단어로 구성될 수 있음 | ✅   | `Heart`, `ArrowCorner`, `Calendar` |
| **[Direction]**     | 방향. 대각선은 상/하를 좌/우보다 먼저 표기          | 선택 | `Right`, `Up`, `DownLeft`          |
| **[State/Form]**    | 상태·형태 또는 `multi`의 색상 변형                  | 선택 | `Off`, `Pink`, `Underline`         |
| **[Quantity/Size]** | 수량·크기 변형                                      | 선택 | `Double`, `Large`, `Long`          |
| **[Container]**     | 아이콘을 감싸는 형태                                | 선택 | `Circle`, `Square`, `Rounded`      |
| **[Style]**         | `basic`의 면 스타일 접미사. 항상 맨 끝              | 선택 | `Fill`                             |

Modifier가 여러 개인 경우 다음 순서를 따릅니다.

```
[Direction] → [State/Form] → [Quantity/Size] → [Container] → [Style]
```

컴포넌트명과 SVG 파일명은 동일한 단어와 조합 순서를 사용합니다. 파일 카테고리 `basic`/`multi`는 각각
컴포넌트 접두사 `Icon`/`IconMulti`로 변환합니다.

**스타일 접미사 규칙** (구조와 별개로 맨 끝에 적용, **단색(basic) 전용**)

- **line** = 기본, 접미사 **없음**
- **면(fill) 형태** = 위 이름 맨 끝에 `Fill` 접미사
- **멀티컬러(multi)** = 형태(면/선)와 무관하게 **`Fill` 스타일 접미사 없음**

```
IconBell        // 단색 line (기본)
IconBellFill    // 단색 면(fill)
IconMultiFlag   // 멀티컬러 — 면이어도 Fill 없음
```

> ❌ 멀티컬러에 `Fill`을 붙이지 않습니다. `Fill` 접미사는 **단색 아이콘의 면 형태에만** 씁니다.

**멀티컬러 색상 변형** (`multi` 전용)

멀티컬러는 색상이 하드코딩되어 **prop으로 내부 색상을 바꿀 수 없습니다.** 따라서 **같은 형태에서 색만 다른 변형**이
필요하면 색상을 **상태/형태 위치**에 붙여 컴포넌트를 나눕니다. 다른 Modifier와 조합할 때도
`방향 → 상태/형태(색상) → 수량/크기 → 컨테이너` 순서를 따릅니다.

```
IconMultiBellBlue          // ic-multi-bell-blue.svg
IconMultiBellPink          // ic-multi-bell-pink.svg
IconMultiCheckPinkCircle   // ic-multi-check-pink-circle.svg
```

- 색상 접미사는 **`multi`에서만** 허용 (prop으로 내부 색상 지정이 불가능하기 때문)
- **`basic`은 이름에 색상을 넣지 않습니다.** `currentColor`를 사용하는 SVG는 `color` prop으로 색을 지정합니다.
  ❌ `IconBellBlue` → ✅ `<IconBell color="blue" />`

> 현재 `basic` 폴더에는 `currentColor` 대신 색상이 하드코딩된 기존 SVG도 있습니다. 이 경우 컴포넌트가
> `color` prop을 받아도 내부 색상은 바뀌지 않습니다. 새 `basic` SVG에는 `currentColor`를 사용합니다.

### 2-2. 조립 예시

```tsx
Icon + Check                          = IconCheck
Icon + Check + Circle                 = IconCheckCircle
Icon + Chevron + Right                = IconChevronRight
Icon + Chevron + Right + Double       = IconChevronRightDouble
Icon + Arrow + Right + Long           = IconArrowRightLong
Icon + Calendar + Cancel              = IconCalendarCancel
Icon + Arrow + Down + Left            = IconArrowDownLeft

// line은 기본 → 접미사 없음
Icon + Bell                           = IconBell
Icon + Arrow + Right                  = IconArrowRight

// 면(fill) 형태 → Fill suffix
Icon + Comment + Fill                 = IconCommentFill
Icon + Bell + Fill                    = IconBellFill

// 멀티컬러 → IconMulti 접두사, 스타일 suffix 없음
IconMulti + Flag                      = IconMultiFlag
IconMulti + Share                     = IconMultiShare

// 멀티컬러 색상 변형 → 색상 suffix 허용 (multi 전용)
IconMulti + Bell + Blue               = IconMultiBellBlue
IconMulti + Bell + Pink               = IconMultiBellPink
IconMulti + Check + Pink + Circle     = IconMultiCheckPinkCircle
```

### 2-3. 형태별 방향 아이콘 구분

**같은 방향이라도 형태가 다르면 다른 이름**을 씁니다.

| 형태        | 시각적 특징       | 용도                        | 네이밍                   |
| ----------- | ----------------- | --------------------------- | ------------------------ |
| **Caret**   | 작은 삼각형 (▼ ▲) | 드롭다운, 펼침/접힘         | `IconCaret[Direction]`   |
| **Chevron** | 각진 꺾쇠 (> <)   | 페이지 내비게이션, 슬라이드 | `IconChevron[Direction]` |
| **Arrow**   | 긴 화살표 (→ ←)   | 페이지 이동, 방향 지시      | `IconArrow[Direction]`   |

```tsx
<Select icon={<IconCaretDown />} />        // 드롭다운
<Button><IconChevronRight /></Button>      // 캐러셀·슬라이더
<Link>다음 <IconArrowRight /></Link>        // 페이지 이동
```

---

### 2-4. SVG 파일 네이밍

**파일명은 kebab-case(소문자 + 하이픈)**, 컴포넌트명은 PascalCase 입니다.
컴포넌트 네이밍의 단어와 조합 순서를 그대로 kebab-case로 옮기고, 앞에 카테고리 접두사를 붙입니다.

#### 파일명 구조

```
ic-[category]-[object]-[direction]-[state/form]-[quantity/size]-[container]-[fill].svg
```

| 요소         | 설명                                                  | 예시             |
| ------------ | ----------------------------------------------------- | ---------------- |
| `ic-`        | 아이콘 고정 접두사                                    | `ic-`            |
| `[category]` | `basic`(`Icon`) / `multi`(`IconMulti`, 색상 하드코딩) | `basic`, `multi` |
| 이후         | 컴포넌트의 Object/Modifier/… 를 kebab-case로          | `arrow-right`    |
| `[fill]`     | `basic` 면 형태일 때만 사용. line은 붙이지 않음       | `fill`           |

#### 매핑 규칙

파일 카테고리에 맞는 컴포넌트 접두사를 붙이고, 나머지 단어를 PascalCase로 이어 붙입니다.

```bash
# 단색 (basic, currentColor) — line은 접미사 없음, fill만 -fill
ic-basic-arrow-right.svg        →  IconArrowRight        (line, 기본)
ic-basic-arrow-corner-down-right.svg
                                →  IconArrowCornerDownRight
ic-basic-arrow-down-left-long-circle-fill.svg
                                →  IconArrowDownLeftLongCircleFill
ic-basic-comment-fill.svg       →  IconCommentFill       (fill)
ic-basic-check-circle.svg       →  IconCheckCircle       (line, 기본)

# 멀티컬러 (multi, 색 하드코딩) — IconMulti 접두사, 스타일 suffix 없음
ic-multi-bell.svg               →  IconMultiBell
ic-multi-bell-pink.svg          →  IconMultiBellPink
ic-multi-check-pink-circle.svg  →  IconMultiCheckPinkCircle
ic-multi-flag.svg               →  IconMultiFlag
```

#### 폴더 위치

```
src/icons/basic/    # ic-basic-*.svg
src/icons/multi/    # ic-multi-*.svg
```

> ⚠️ **파일명은 전부 소문자**로 시작합니다. `Ic-...` 처럼 대문자를 쓰면 안 됩니다 (`ic-`).

---

## 3. Modifier 사용 규칙

### 3-1. 방향

**패턴**: `[Object] + [Direction]`

대각선 방향은 **상/하(`Up`/`Down`)를 먼저**, **좌/우(`Left`/`Right`)를 나중에** 표기합니다.

```text
IconArrowUp
IconArrowDownLeft       // 왼쪽 아래 방향
IconArrowUpRight        // 오른쪽 위 방향
```

> ❌ `IconArrowLeftDown`, `IconArrowRightUp`처럼 좌/우를 먼저 표기하지 않습니다.

### 3-2. 상태 / 형태

**패턴**: `[Object] + [Direction] + [State/Form]`

```text
IconToggleOff
IconMultiBellPink
IconMultiCheckPinkCircle  // 상태/색상(Pink) + 컨테이너(Circle)
IconCalendarCancel
IconPhoneCall
IconLocationTarget
```

> 색상 이름은 색상이 하드코딩된 `multi` 아이콘의 색상 변형에만 사용합니다.

### 3-3. 수량 / 크기

**패턴**: `[Object] + [Direction] + [Quantity/Size]`

```text
IconChevronRight        // 기본 >
IconChevronRightDouble  // 2개 겹침 >>
IconArrowRight          // 기본 →
IconArrowRightLong      // 긴 화살표 ⟶
IconArrowRightLarge     // 큰 화살표
```

### 3-4. 컨테이너

컨테이너는 스타일 접미사 `Fill`을 제외하고 **항상 마지막**에 둡니다.

```tsx
IconCheck    → IconCheckCircle   // 원형 안의 ✓
IconClose    → IconCloseCircle   // 원형 안의 X
IconPlus     → IconPlusCircle    // 원형 안의 +
IconInfo     → IconInfoCircle    // 원형 안의 i
```

**컨테이너 종류**: `Circle`(원형) · `Square`(사각형) · `Rounded`(둥근 사각형)

### 3-5. 스타일 접미사

- `basic`의 면 스타일 접미사 `Fill`은 이름의 맨 끝에 둡니다.
- `multi`에는 스타일 접미사를 붙이지 않습니다.
- `multi`의 색상은 스타일이 아니라 상태/형태 Modifier로 취급합니다.

```text
IconCheckCircleFill
```

### 3-6. 복합 Modifier 순서

여러 개가 필요하면 **방향 > 상태/형태 > 수량/크기 > 컨테이너 > Fill** 순서로 배치합니다.
색상은 상태/형태에 포함되며, 컨테이너는 스타일 접미사 `Fill`을 제외하고 마지막에 둡니다.

```text
IconArrowDownLeft                         // 방향: 상/하 + 좌/우
IconChevronDownDouble                     // 방향 + 수량
IconArrowRightOffLongCircle               // 방향 + 상태 + 크기 + 컨테이너
IconCheckCircleFill                       // 컨테이너 + 스타일
IconMultiCheckPinkCircle                  // 상태/색상 + 컨테이너
```

> ❌ `IconMultiCheckCirclePink`처럼 색상을 컨테이너 뒤에 두지 않습니다.
> ✅ `IconMultiCheckPinkCircle`처럼 상태/색상을 컨테이너 앞에 둡니다.

**방향 + 스타일이 동시에 있는 경우** (예: 오른쪽 화살표)

```text
// line은 기본 → 접미사 없음
IconArrowRight           // 오른쪽 화살표, 외곽선(line, 기본)
IconChevronDown          // 아래쪽 쉐브론, line

// 면(fill) → [Object] + [Direction] + Fill, 스타일은 맨 끝
IconArrowRightFill       // 오른쪽 화살표, 채움
IconCaretUpFill          // 위쪽 캐럿, 채움

// [Object] + [Direction] + [Container] + Fill
IconArrowUpCircle        // 위쪽 화살표 + 원형 컨테이너 (line, 기본)
IconArrowUpCircleFill    // 위쪽 화살표 + 원형 컨테이너 + 채움
```

> ❌ `IconArrowFillRight` 처럼 `Fill`을 방향 앞에 두지 않습니다.
> ❌ line에 `IconArrowRightLine` 처럼 `Line` 접미사를 붙이지 않습니다. (line은 기본값)

---

## 4. Illustration 네이밍

### 4-1. 네이밍 구조

```
Illustration + [Object] + [Modifier]
```

| 요소             | 설명        | 필수 | 예시                        |
| ---------------- | ----------- | ---- | --------------------------- |
| **Illustration** | 고정 접두사 | ✅   | `Illustration`              |
| **[Object]**     | 주요 대상   | ✅   | `Ticket`, `Folder`, `Inbox` |
| **[Modifier]**   | 상태·변형   | 선택 | `Empty`, `Success`, `Error` |

### 4-2. 특징

- **Fill/Line·variant 없음** — 각각 독립된 디자인
- **고유 색상 하드코딩** — `color` prop으로 내부 색상 변경 불가
- 일반 SVG 컴포넌트와 동일하게 `width`, `height`, `className`, `style`, ARIA 속성 등을 지원

```tsx
<IllustrationPadlock />
<IllustrationBellEmpty />
<IllustrationFolderSearch />
<IllustrationSnowMountainCircle />
```

### 4-3. SVG 파일 네이밍

일러스트레이션의 **고정 접두사는 `il-`** 입니다. (아이콘 `ic-` 와 구분)
파일명은 아이콘과 동일하게 **kebab-case(소문자 + 하이픈)**, 컴포넌트명은 PascalCase 입니다.

```
il-[object]-[modifier].svg
```

| 요소         | 설명                                | 예시               |
| ------------ | ----------------------------------- | ------------------ |
| `il-`        | 일러스트레이션 고정 접두사 (소문자) | `il-`              |
| `[object]`   | 주요 대상                           | `ticket`, `folder` |
| `[modifier]` | 상태·변형 (선택)                    | `empty`, `error`   |

**매핑 규칙** — `il-` 접두사를 떼고 → 각 단어를 PascalCase로 이어 붙이고 → `Illustration`을 앞에 붙입니다.

```bash
il-ticket.svg          →  IllustrationTicket
il-folder.svg          →  IllustrationFolder
il-bell-empty.svg      →  IllustrationBellEmpty
il-folder-search.svg   →  IllustrationFolderSearch
```

> 아이콘과 달리 `category`(basic/multi)·`fill` 접미사가 **없습니다.** 색상은 항상 하드코딩입니다.

### 4-4. 금지

```tsx
// ❌ variant·스타일·Colored suffix 금지
<IllustrationPadlock variant="colored" />
IllustrationPadlockColored
IllustrationPadlockFilled

// ✅ 크기는 width/height로 지정
<IllustrationPadlock width={80} height={80} />
```

---

## 5. 네이밍 우선순위

1. **단색 스타일은 line이 기본(접미사 없음), 면 형태만 `Fill` suffix** (본 프로젝트 규칙)

   ```text
   IconHeart      // line (기본)
   IconHeartFill  // fill (면)
   ```

2. **의미·용도가 비슷하면 시각적 형태로 구분**

   ```text
   IconCaretDown   // 작은 삼각형 ▼
   IconChevronDown // 각진 꺾쇠 ∨
   IconArrowDown   // 긴 화살표 ↓
   ```

---

## 6. 디자이너 없이 네이밍하는 3단계

**Step 1. 기존 아이콘 검색** — 비슷한 게 이미 있는지 `src/icons/` 와 `index.ts`에서 확인

**Step 2. 형태 분석** — 아래 항목으로 시각적 특징 정리

- 방향: `Up`·`Down`·`Left`·`Right`·`DownLeft` 등 / 없음
- 상태/형태: `Cancel`·`Call`·`Target` 및 multi 색상 `Pink`·`Blue` / 없음
- 크기·수량: `Double`·`Long`·`Large` / 없음
- 컨테이너: 원형 `Circle` / 사각형 `Square` / 없음
- 스타일: basic 면 `Fill` / 없음

**Step 3. 결정 매트릭스로 조립**

| 질문               | 답변 예              | 추가                               |
| ------------------ | -------------------- | ---------------------------------- |
| 주요 형태는?       | 화살표               | `IconArrow`                        |
| 방향이 있나?       | 위쪽                 | `+ Up` → `IconArrowUp`             |
| 컨테이너가 있나?   | 원형                 | `+ Circle` → `IconArrowUpCircle`   |
| 면(fill) 형태인가? | 아니오, 외곽선(line) | 접미사 없음 → `IconArrowUpCircle`  |
| 면(fill) 형태인가? | 예, 채움             | `+ Fill` → `IconArrowUpCircleFill` |

---

## 7. 금지 사항

```text
// ❌ 용도를 이름에 포함 (용도는 바뀔 수 있음)
IconButtonClose, IconHeaderLogo, IconMenuButton
// ✅ 형태만
IconClose, IconLogo, IconMenu

// ❌ 중복 수식어
IconArrowRightDirection, IconRoundedCircleCheck
// ✅
IconArrowRight, IconCheckCircle

// ❌ 불명확한 약어
IconChvRt, IconArrL, IconClkCrcl
// ✅
IconChevronRight, IconArrowLeft, IconClockCircle

// ❌ 동사 포함 (물리적 동작 제외)
IconClickHere, IconOpenMenu, IconSubmitForm
// ✅
IconPointer, IconMenu, IconCheck
// ✅ 예외 — 물리적 동작
IconPhoneCall, IconDragMenu
```

---

## 8. 체크리스트

### Icon 추가

- [ ] 기존 Icon과 이름이 **중복되지 않는가**
- [ ] 형태가 명확히 구분되는가 (Caret / Chevron / Arrow)
- [ ] 컴포넌트명이 **PascalCase**인가
- [ ] 카테고리에 맞는 컴포넌트 접두사인가 — `basic`은 `Icon`, `multi`는 `IconMulti`
- [ ] 순서가 `Icon[Multi] + [Object] + [Direction] + [State/Form] + [Quantity/Size] + [Container] + [Style]` 인가
- [ ] 대각선 방향은 **상/하 + 좌/우** 순서인가 (`DownLeft`, `UpRight`)
- [ ] **line은 접미사 없음(기본), 면 형태만 맨 끝에 `Fill` suffix, 멀티컬러는 스타일 suffix 없음**인가
- [ ] 용도가 아닌 **생김새**로 이름을 지었는가
- [ ] 새 `basic` SVG가 `currentColor`를 사용하는가
- [ ] 색상을 이름에 넣었다면 **`multi`이고 상태/형태 위치에 있는가?** (`IconMultiCheckPinkCircle`)
- [ ] SVG 파일명이 `ic-` + `basic`/`multi` + **kebab-case(소문자)**인가 (`ic-basic-arrow-right.svg`)
- [ ] `npm run generate:exports`로 `src/icons/index.ts`를 갱신했는가

### Illustration 추가

- [ ] 기존 Illustration과 중복되지 않는가
- [ ] 컴포넌트 `Illustration` prefix + `[Object]` + `[Modifier]` 순서인가
- [ ] SVG 파일명이 `il-` 접두사(소문자)로 시작하는가
- [ ] 크기는 `width`/`height`로 지정하는가 (`size` 전용 prop 없음)
- [ ] 고유 색상이 SVG에 하드코딩되어 있는가
- [ ] `npm run generate:exports`로 `src/illustrations/index.ts`를 갱신했는가

---

## 9. 참고 자료

- [Heroicons](https://heroicons.com/) — 명확한 네이밍
- [Lucide](https://lucide.dev/) — 풍부한 아이콘, 검색 우수
- [Material Icons](https://fonts.google.com/icons) — 구글 표준
- [Iconoir Naming Convention](https://iconoir.com/) — 네이밍 가이드
