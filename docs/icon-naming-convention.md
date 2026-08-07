# 아이콘 네이밍 가이드

`snorose-icon` 라이브러리에 아이콘과 일러스트레이션을 추가할 때 공통으로 따르는 네이밍 규칙입니다.
디자이너 없이도 일관된 이름을 붙일 수 있도록, **생김새(형태) 기준**으로 판단합니다.

> 이 문서는 팀 회의에서 확정된 규칙을 기준으로 합니다. 레퍼런스(Heroicons/Lucide 등)의 관례를 참고하되,
> 충돌하는 부분은 아래 규칙을 우선합니다.


---

## 0. 이 프로젝트의 핵심 결정 (요약)

| 결정 사항 | 내용 |
| --- | --- |
| **스타일 구분 방식** | `variant` prop이 **아님**. **line이 기본(접미사 없음)**, **면(fill) 형태만 `Fill` suffix** |
| **단색 아이콘 (`basic`)** | `currentColor` 사용 → `color` props 변경 **가능**. line = 접미사 없음 / fill = `Fill` suffix |
| **멀티컬러 아이콘 (`multi`)** | 색상 하드코딩 → `color` props 변경 **불가능**. `Fill` 스타일 접미사 없음. 단, 색만 다른 변형은 **색상 접미사 허용**(`IconBellBlue`) |

> **basic / multi를 가르는 진짜 기준은 "색 개수"가 아니라 "색을 바꿀 수 있느냐"입니다.**
> - `currentColor`로 색을 props로 제어 → `basic` (보통 1색)
> - 색상이 SVG에 하드코딩되어 변경 불가 → `multi` (보통 2색 이상이지만, **브랜드색 등으로 1색이어도 하드코딩이면 `multi`**)
| **컴포넌트 케이스** | PascalCase (`IconArrowRight`, `IconArrowRightFill`) |
| **SVG 파일 케이스** | kebab-case, 소문자 + 하이픈 (`ic-basic-arrow-right.svg`) |
| **파일 접두사** | 아이콘 `ic-` / 일러스트레이션 `il-` |
| **네이밍 기준** | 아이콘의 **생김새**로 결정 (쓰이는 위치·용도로 짓지 않음) |

```tsx
// 단색 — line은 접미사 없음(기본), fill만 Fill suffix, color 변경 가능
<IconTicket />       // line (기본)
<IconTicketFill />   // fill (면)

// 멀티컬러 — suffix 없음, color 변경 불가
<IconFlag />
<IconShare />
```


---

## 1. Icon vs Illustration 구분 (최우선 판단)

먼저 추가하려는 대상이 **Icon인지 Illustration인지** 판단합니다.

| 기준 | Icon | Illustration |
| --- | --- | --- |
| **색상** | 단색 또는 제한된 멀티컬러(기능성) | 여러 색·서사적 표현 |
| **SVG 구조** | 단순 path | 복잡한 구조 (gradient, layers) |
| **스타일 구분** | 단색은 line(기본)/fill 지원 | 없음 (독립 컴포넌트) |
| **용도** | 기능적 (버튼, 상태 표시 등) | 프로모션·강조·Empty State |
| **props** | 단색은 `color` 가능 | `size`만, `color`·`variant` 없음 |

**판단 순서**
1. Gradient·복잡한 layers가 있는가 → **Illustration**
2. 프로모션·Empty State·강조 목적인가 → **Illustration**
3. 그 외 기능적 아이콘 → **Icon**

이 저장소의 폴더 구조도 이 기준을 따릅니다.

```
src/
├── icons/
│   └── assets/
│       ├── basic/        # currentColor 사용, 색 변경 가능 (ic-basic-*.svg) → line 기본, fill만 Fill suffix
│       └── multi/   # 색상 하드코딩, 색 변경 불가     (ic-multi-*.svg) → suffix 없음
└── illustrations/        # 일러스트레이션
```

---

## 2. Icon 네이밍

### 2-1. 네이밍 구조

```
Icon + [Object] + [Modifier] + [Direction/Container]
```

| 요소 | 설명 | 필수 | 예시 |
| --- | --- | --- | --- |
| **Icon** | 고정 접두사 | ✅ | `Icon` |
| **[Object]** | 아이콘의 주요 형태/의미 | ✅ | `Heart`, `Arrow`, `Calendar` |
| **[Modifier]** | 크기·수량·상태 변형 | 선택 | `Long`, `Double`, `Cancel` |
| **[Direction/Container]** | 방향 또는 컨테이너 형태 | 선택 | `Right`, `Circle`, `Up` |

**스타일 접미사 규칙** (구조와 별개로 맨 끝에 적용, **단색(basic) 전용**)

- **line** = 기본, 접미사 **없음**
- **면(fill) 형태** = 위 이름 맨 끝에 `Fill` 접미사
- **멀티컬러(multi)** = 형태(면/선)와 **무관하게 접미사 없음** — `Fill` 붙이지 않음

```
IconBell        // 단색 line (기본)
IconBellFill    // 단색 면(fill)
IconFlag        // 멀티컬러 — 면이어도 Fill 없음
```

> ❌ 멀티컬러에 `Fill`을 붙이지 않습니다. `Fill` 접미사는 **단색 아이콘의 면 형태에만** 씁니다.

**멀티컬러 색상 변형** (`multi` 전용)

멀티컬러는 색상이 하드코딩되어 **props로 색을 바꿀 수 없습니다.** 따라서 **같은 형태에서 색만 다른 변형**이
필요하면, 색상을 **맨 끝 접미사**로 붙여 컴포넌트를 나눕니다.

```
IconBellBlue    // ic-multi-bell-blue.svg
IconBellPink    // ic-multi-bell-pink.svg
```

- 색상 접미사는 **`multi`에서만** 허용 (props로 색 지정이 불가능하기 때문)
- **`basic`은 색을 props(`currentColor`)로 주므로 이름에 색을 넣지 않습니다.**
  ❌ 단색에 `IconBellBlue` (X) → ✅ `<IconBell color="blue" />`

### 2-2. 조립 예시

```tsx
Icon + Check                          = IconCheck
Icon + Check + Circle                 = IconCheckCircle
Icon + Chevron + Right                = IconChevronRight
Icon + Chevron + Right + Double       = IconChevronRightDouble
Icon + Arrow + Long + Right           = IconArrowLongRight
Icon + Calendar + Cancel              = IconCalendarCancel

// line은 기본 → 접미사 없음
Icon + Bell                           = IconBell
Icon + Arrow + Right                  = IconArrowRight

// 면(fill) 형태 → Fill suffix
Icon + Comment + Fill                 = IconCommentFill
Icon + Bell + Fill                    = IconBellFill

// 멀티컬러 → 스타일 suffix 없음
Icon + Flag                           = IconFlag
Icon + Share                          = IconShare

// 멀티컬러 색상 변형 → 색상 suffix 허용 (multi 전용)
Icon + Bell + Blue                    = IconBellBlue
Icon + Bell + Pink                    = IconBellPink
```

### 2-3. 형태별 방향 아이콘 구분

**같은 방향이라도 형태가 다르면 다른 이름**을 씁니다.

| 형태 | 시각적 특징 | 용도 | 네이밍 |
| --- | --- | --- | --- |
| **Caret** | 작은 삼각형 (▼ ▲) | 드롭다운, 펼침/접힘 | `IconCaret[Direction]` |
| **Chevron** | 각진 꺾쇠 (> <) | 페이지 내비게이션, 슬라이드 | `IconChevron[Direction]` |
| **Arrow** | 긴 화살표 (→ ←) | 페이지 이동, 방향 지시 | `IconArrow[Direction]` |

```tsx
<Select icon={<IconCaretDown />} />        // 드롭다운
<Button><IconChevronRight /></Button>      // 캐러셀·슬라이더
<Link>다음 <IconArrowRight /></Link>        // 페이지 이동
```

---

## 2-4. SVG 파일 네이밍

**파일명은 kebab-case(소문자 + 하이픈)**, 컴포넌트명은 PascalCase 입니다.
컴포넌트 네이밍 순서를 그대로 kebab-case로 옮기고, 앞에 카테고리 접두사를 붙입니다.

### 파일명 구조

```
ic-[category]-[object]-[modifier]-[direction/container]-[fill].svg
```

| 요소 | 설명 | 예시 |
| --- | --- | --- |
| `ic-` | 아이콘 고정 접두사 | `ic-` |
| `[category]` | `basic`(currentColor, 색 변경 O) / `multi`(색 하드코딩, 변경 X) | `basic`, `multi` |
| 이후 | 컴포넌트의 Object/Modifier/… 를 kebab-case로 | `arrow-right` |
| `[fill]` | 면 형태일 때만 `-fill`. **line은 붙이지 않음** | `-fill` |

### 매핑 규칙

`ic-{category}-` 접두사를 떼고 → 각 단어를 PascalCase로 이어 붙이고 → `Icon`을 앞에 붙입니다.

```bash
# 단색 (basic, currentColor) — line은 접미사 없음, fill만 -fill
ic-basic-arrow-right.svg        →  IconArrowRight        (line, 기본)
ic-basic-comment-fill.svg       →  IconCommentFill       (fill)
ic-basic-check-circle.svg       →  IconCheckCircle       (line, 기본)

# 멀티컬러 (multi, 색 하드코딩) — suffix 없음
ic-multi-bell.svg               →  IconBell
ic-multi-flag.svg               →  IconFlag
```

### 폴더 위치

```
src/icons/assets/basic/       # ic-basic-*.svg  (currentColor, 색 변경 가능)
src/icons/assets/multi/  # ic-multi-*.svg  (색상 하드코딩, 색 변경 불가)
```

> ⚠️ **파일명은 전부 소문자**로 시작합니다. `Ic-...` 처럼 대문자를 쓰면 안 됩니다 (`ic-`).

---

## 3. Modifier 사용 규칙

### 3-1. 크기 / 수량

**패턴**: `[Object] + [Size/Quantity] + [Direction]`

```tsx
IconChevronRight        // 기본 >
IconChevronRightDouble  // 2개 겹침 >>
IconArrowRight          // 기본 →
IconArrowLongRight      // 긴 화살표 ⟶
IconArrowBigRight       // 굵은 화살표
```

### 3-2. 컨테이너 (항상 마지막)

```tsx
IconCheck    → IconCheckCircle   // 원형 안의 ✓
IconClose    → IconCloseCircle   // 원형 안의 X
IconPlus     → IconPlusCircle    // 원형 안의 +
IconInfo     → IconInfoCircle    // 원형 안의 i
```

**컨테이너 종류**: `Circle`(원형) · `Square`(사각형) · `Rounded`(둥근 사각형)

### 3-3. 상태 / 형태

**패턴**: `[Object] + [State]`

```tsx
IconCalendar  → IconCalendarCancel  // X 표시된 캘린더
IconPhone     → IconPhoneCall       // 통화 중
IconLocation  → IconLocationTarget  // 십자선 포함
```

### 3-4. 복합 Modifier 순서

여러 개가 필요하면 **의미 > 형태/방향 > 컨테이너 > Fill** 순서로 배치합니다.
즉 `Fill`은 **항상 맨 끝**에 옵니다. (line은 접미사가 없으므로 그대로 끝남)

```tsx
IconArrowUpCircle        // 방향(Up) + 컨테이너(Circle) — line 기본
IconChevronDownDouble    // 방향(Down) + 수량(Double)
IconCheckCircleFill      // 컨테이너(Circle) + 면(Fill)
```

**방향 + 스타일이 동시에 있는 경우** (예: 오른쪽 화살표)

```tsx
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

| 요소 | 설명 | 필수 | 예시 |
| --- | --- | --- | --- |
| **Illustration** | 고정 접두사 | ✅ | `Illustration` |
| **[Object]** | 주요 대상 | ✅ | `Ticket`, `Folder`, `Inbox` |
| **[Modifier]** | 상태·변형 | 선택 | `Empty`, `Success`, `Error` |

### 4-2. 특징

- **Fill/Line·variant 없음** — 각각 독립된 디자인
- **고유 색상 하드코딩** — `color` props로 변경 불가
- **`size` props만 지원**

```tsx
IllustrationTicket
IllustrationFolder
IllustrationEmptyInbox
IllustrationEmptySearch
IllustrationEmojiHappy
IllustrationError
```

### 4-3. SVG 파일 네이밍

일러스트레이션의 **고정 접두사는 `il-`** 입니다. (아이콘 `ic-` 와 구분)
파일명은 아이콘과 동일하게 **kebab-case(소문자 + 하이픈)**, 컴포넌트명은 PascalCase 입니다.

```
il-[object]-[modifier].svg
```

| 요소 | 설명 | 예시 |
| --- | --- | --- |
| `il-` | 일러스트레이션 고정 접두사 (소문자) | `il-` |
| `[object]` | 주요 대상 | `ticket`, `folder` |
| `[modifier]` | 상태·변형 (선택) | `empty`, `error` |

**매핑 규칙** — `il-` 접두사를 떼고 → 각 단어를 PascalCase로 이어 붙이고 → `Illustration`을 앞에 붙입니다.

```bash
il-ticket.svg          →  IllustrationTicket
il-folder.svg          →  IllustrationFolder
il-empty-inbox.svg     →  IllustrationEmptyInbox
il-error.svg           →  IllustrationError
```

> 아이콘과 달리 `category`(basic/multi)·`fill` 접미사가 **없습니다.** 색상은 항상 하드코딩입니다.

### 4-4. 금지

```tsx
// ❌ variant·스타일·Colored suffix 금지
<IllustrationTicket variant="colored" />
IllustrationTicketColored
IllustrationTicketFilled

// ✅
<IllustrationTicket size={80} />
```

---

## 5. 네이밍 우선순위

1. **단색 스타일은 line이 기본(접미사 없음), 면 형태만 `Fill` suffix** (본 프로젝트 규칙)

   ```tsx
   IconHeart      // line (기본)
   IconHeartFill  // fill (면)
   ```

2. **의미·용도가 비슷하면 시각적 형태로 구분**

   ```tsx
   IconCaretDown   // 작은 삼각형 ▼
   IconChevronDown // 각진 꺾쇠 ∨
   IconArrowDown   // 긴 화살표 ↓
   ```

---

## 6. 디자이너 없이 네이밍하는 4단계

**Step 1. 기존 아이콘 검색** — 비슷한 게 이미 있는지 `src/icons/` 와 `index.ts`에서 확인
**Step 2. 형태 분석** — 아래 항목으로 시각적 특징 정리
   - 렌더링: stroke·외곽선(line → 접미사 없음) / fill·면(→ `Fill`) / 멀티컬러(→ suffix 없음)
   - 컨테이너: 원형 `Circle` / 사각형 `Square` / 없음
   - 방향: `Up`·`Down`·`Left`·`Right`·`UpLeft` 등 / 없음
   - 크기·수량: `Double`·`Long`·`Big` / 없음
   - 상태: `Cancel`·`Call`·`Target` / 없음
**Step 3. 레퍼런스 확인** — Heroicons·Lucide·Material Icons에서 유사 아이콘 검색
**Step 4. 결정 매트릭스로 조립**

| 질문 | 답변 예 | 추가 |
| --- | --- | --- |
| 주요 형태는? | 화살표 | `IconArrow` |
| 방향이 있나? | 위쪽 | `+ Up` → `IconArrowUp` |
| 컨테이너가 있나? | 원형 | `+ Circle` → `IconArrowUpCircle` |
| 면(fill) 형태인가? | 아니오, 외곽선(line) | 접미사 없음 → `IconArrowUpCircle` |
| 면(fill) 형태인가? | 예, 채움 | `+ Fill` → `IconArrowUpCircleFill` |

---

## 7. 금지 사항

```tsx
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

### Icon vs Illustration 구분
- [ ] Gradient·복잡한 layers가 있으면 → Illustration
- [ ] 프로모션·Empty State·강조 목적이면 → Illustration

### Icon 추가
- [ ] 기존 Icon과 이름이 **중복되지 않는가**
- [ ] 형태가 명확히 구분되는가 (Caret / Chevron / Arrow)
- [ ] 컴포넌트명이 **PascalCase**인가
- [ ] 순서가 `Icon + [Object] + [Modifier] + [Direction/Container]` 인가
- [ ] **line은 접미사 없음(기본), 면 형태만 맨 끝에 `Fill` suffix, 멀티컬러는 suffix 없음**인가
- [ ] 용도가 아닌 **생김새**로 이름을 지었는가
- [ ] 색 변경 여부로 올바르게 분류했는가 — **단색(`currentColor`, 변경 O) → `basic`** / **하드코딩(변경 X) → `multi`**
- [ ] 색상을 이름에 넣었다면 **`multi`인가?** (basic은 색을 props로 주므로 이름에 색 금지. multi 색상 변형만 `IconBellBlue` 허용)
- [ ] SVG 파일명이 `ic-` + `basic`/`multi` + **kebab-case(소문자)**인가 (`ic-basic-arrow-right.svg`)
- [ ] 레퍼런스(Heroicons·Lucide·Material)에서 유사 아이콘을 참고했는가
- [ ] `src/icons/index.ts`에 export를 추가했는가

### Illustration 추가
- [ ] 기존 Illustration과 중복되지 않는가
- [ ] 컴포넌트 `Illustration` prefix + `[Object]` + `[Modifier]` 순서인가
- [ ] SVG 파일명이 `il-` 접두사(소문자)로 시작하는가
- [ ] `size` prop만 지원하는가 (color·variant 없음)
- [ ] 고유 색상이 SVG에 하드코딩되어 있는가
- [ ] `src/illustrations/index.ts`에 export를 추가했는가

---

## 9. 참고 자료

- [Heroicons](https://heroicons.com/) — 명확한 네이밍
- [Lucide](https://lucide.dev/) — 풍부한 아이콘, 검색 우수
- [Material Icons](https://fonts.google.com/icons) — 구글 표준
- [Iconoir Naming Convention](https://iconoir.com/) — 네이밍 가이드
