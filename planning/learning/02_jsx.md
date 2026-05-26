# 02. JSX

## ① 개념 — 왜 필요한가?

JS로 UI를 직접 만들면 createElement()를 중첩해서 써야 해서 구조 파악이 어렵다.
JSX는 HTML처럼 보이지만 Vite(Babel)가 JS로 변환하는 문법이다.

```jsx
// JSX (개발자가 쓰는 것)
<div className="card"><h3>{title}</h3></div>

// 실제 변환 결과
React.createElement('div', { className: 'card' },
  React.createElement('h3', null, title)
)
```

---

## ② 구현 — 핵심 규칙

### 1. JS 표현식은 {}로 감싼다
```jsx
const name = '이상민';
<h1>{name}</h1>         // 변수
<p>{1 + 2}</p>          // 연산
<span>{isOk && '확인'}</span>  // 조건부
```
문(statement)은 불가 — if, for 등은 {} 안에 못 들어감

### 2. 반드시 하나의 루트
```jsx
// ❌
return <h1>제목</h1><p>본문</p>

// ✅ Fragment — 실제 DOM에 태그 안 생김
return <><h1>제목</h1><p>본문</p></>
```

### 3. 모든 태그는 닫기
```jsx
<input />  ✅    <input>  ❌
```

### 4. HTML 속성 이름 차이
```jsx
class   → className
for     → htmlFor
onclick → onClick  (camelCase)
```

### 이벤트 처리
```jsx
// webCore
btn.addEventListener('click', () => { ... })

// JSX
<button onClick={() => { ... }}>클릭</button>
```

### React Router 기본 구조
```jsx
<BrowserRouter>       // URL 감지 컨테이너
  <Routes>            // 현재 URL에 맞는 Route 하나만 렌더링
    <Route path="/" element={<Home />} />
    <Route path="/items" element={<ItemList />} />
    <Route path="/items/:id" element={<ItemDetail />} />
    <Route path="*" element={<NotFound />} />  // 404
  </Routes>
</BrowserRouter>
```
- `element` prop에 JSX를 `{}`로 감싸서 전달
- `path="*"` — 매칭 없을 때 fallback

---

## ③ 내가 배운 것 (요약)

- JSX는 HTML이 아니라 JS다 — Vite가 빌드 시 변환
- `{}` 안에는 표현식(값)만 가능, 문(if/for)은 불가
- HTML 속성이 일부 다르다: class→className, onclick→onClick
- Fragment `<>`로 불필요한 DOM 태그 없이 루트를 만들 수 있다
- React Router는 `BrowserRouter > Routes > Route` 구조로 라우팅을 선언한다
