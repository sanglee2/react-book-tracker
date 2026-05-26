# 06. React Router

## ① 개념 — 왜 필요한가?

SPA는 HTML이 하나(index.html)라 URL이 바뀌어도 서버에서 새 파일을 안 받아온다.
React Router가 URL을 읽어서 어떤 컴포넌트를 렌더링할지 결정한다.

### 핵심 3가지
```jsx
// Link — 새로고침 없이 URL 변경
<Link to="/items">목록</Link>

// useNavigate — 코드로 이동
const navigate = useNavigate()
navigate('/items')   // 이동
navigate(-1)         // 뒤로
navigate(0)          // 새로고침

// useParams — URL 파라미터 읽기
// Route: /items/:id → URL: /items/42
const { id } = useParams()   // id = '42'
```

---

## ② 구현 — 핵심 코드

### App.jsx — 라우팅 구조
```jsx
<BrowserRouter>
  <Layout>             // 헤더 항상 표시
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<ItemList />} />
      <Route path="/items/new" element={<ItemNew />} />    // ← 반드시 :id보다 위
      <Route path="/items/:id" element={<ItemDetail />} />
      <Route path="/items/:id/edit" element={<ItemNew />} /> // 같은 컴포넌트 재사용
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
</BrowserRouter>
```
- `/items/new`가 `/items/:id`보다 먼저 — 순서 바뀌면 'new'가 :id로 해석됨

### Layout — children으로 페이지 주입
```jsx
const Layout = ({ children }) => (
  <>
    <header>...</header>
    <div className="container">{children}</div>
  </>
)
// App.jsx에서: <Layout><Routes>...</Routes></Layout>
// 헤더는 고정, Routes 결과만 children 자리에 교체됨
```

### useLocation — 현재 URL로 active 스타일
```jsx
const { pathname } = useLocation()

<Link className={pathname === to ? 'nav__link--active' : 'nav__link'}>
```

### useParams — id에 따라 데이터 재요청
```jsx
const { id } = useParams()

useEffect(() => {
  fetchItem(id)
}, [id])   // id 바뀔 때마다 재실행 — [] 쓰면 이전 데이터 그대로 남음
```

---

## ③ 내가 배운 것 (요약)

- SPA는 HTML이 하나라 React Router가 URL로 컴포넌트를 교체한다
- `<a>` 대신 `<Link>` — 새로고침 없이 URL만 변경
- Route 순서 중요 — 구체적인 경로(`/items/new`)를 파라미터(`:id`)보다 위에
- `useParams`로 URL 파라미터를 읽어 데이터 요청에 활용
- 같은 컴포넌트를 등록/수정에 재사용하고 `id` 유무로 모드 분기
