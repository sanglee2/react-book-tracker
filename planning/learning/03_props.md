# 03. props

## ① 개념 — 왜 필요한가?

props = 부모 컴포넌트가 자식에게 전달하는 데이터. 컴포넌트 함수의 인자와 같다.

```js
// webCore — 함수 인자
const renderCard = (name, description) => `<h3>${name}</h3>`;

// React — props
const Card = ({ title, description }) => <h3>{title}</h3>;
<Card title="프로젝트A" description="설명" />
```

### 핵심 규칙
- **단방향**: 부모 → 자식으로만 흐름
- **읽기 전용**: 자식이 props를 직접 수정 불가

### props vs state
| | props | state |
|--|--|--|
| 누가 만드나 | 부모가 전달 | 컴포넌트 자신 |
| 변경 가능 | ❌ | ✅ |
| 예시 | 카드 제목 | 클릭 횟수, 다크모드 |

---

## ② 구현 — 핵심 코드

### 기본값 (default props)
```jsx
const Button = ({ variant = 'primary', disabled = false }) => { ... }
// 부모가 variant를 안 넘기면 'primary'로 동작
```

### children — 태그 사이 내용
```jsx
const Button = ({ children }) => <button>{children}</button>

<Button>저장하기</Button>       // children = "저장하기"
<Button><span>📎</span></Button> // children = JSX도 가능
```

### props로 스타일 분기
```jsx
className={`btn btn--${variant}`}
// variant='danger' → "btn btn--danger"
// 하나의 컴포넌트가 props에 따라 다른 모습으로 동작
```

### 조건부 렌더링
```jsx
{description && <p>{description}</p>}
// description이 있을 때만 <p> 렌더링
// falsy(null/undefined/"")면 아무것도 안 그림
```

### 이벤트 핸들러도 props로
```jsx
const Card = ({ onClick }) => <div onClick={onClick}>...</div>

// 부모가 동작 결정
<Card onClick={() => navigate(`/items/${id}`)} />
// Card 자신은 클릭 사실만 전달, 로직은 모름 → 재사용 가능한 이유
```

---

## ③ 내가 배운 것 (요약)

- props는 컴포넌트 함수의 인자와 같다 — 구조분해 할당으로 꺼낸다
- 기본값(`= 'primary'`)으로 props가 없어도 동작하게 만든다
- `children`은 태그 사이 내용을 받는 특별한 props다
- 이벤트 핸들러를 props로 받으면 컴포넌트가 재사용 가능해진다
- `&&` 조건부 렌더링으로 props 없을 때 안전하게 처리한다
