# 05. useEffect

## ① 개념 — 왜 필요한가?

렌더링 함수 안에서 API 호출하면 → 상태 변경 → 재렌더링 → 또 API 호출 → 무한 루프.
useEffect는 "렌더링 완료 후에 실행해줘"라는 의미로 사이드 이펙트를 분리한다.

### 의존성 배열
```jsx
useEffect(() => { ... })          // 매 렌더링마다 (거의 안 씀)
useEffect(() => { ... }, [])      // 마운트 시 한 번만
useEffect(() => { ... }, [id])    // id가 바뀔 때마다
```

### webCore와 비교
```js
// webCore — 파일 로드 즉시 실행
fetchProjects();

// React — 마운트 후 실행
useEffect(() => { fetchItems() }, [])
```

---

## ② 구현 — 핵심 코드

### 데이터 패칭 패턴
```jsx
const [items, setItems] = useState([])
const [isLoading, setIsLoading] = useState(true)  // 초기값 true
const [error, setError] = useState(null)

const fetchItems = async () => {
  setIsLoading(true)
  setError(null)         // 이전 에러 초기화

  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('불러오지 못했습니다.')
    const data = await res.json()
    setItems(data)
  } catch (err) {
    setError(err.message)
  } finally {
    setIsLoading(false)  // 성공이든 실패든 로딩 종료
  }
}

useEffect(() => {
  fetchItems()
}, [])
```
- `fetchItems`를 함수로 분리 → useEffect + "다시 시도" 버튼 둘 다 재사용

### 4가지 상태 처리
```jsx
if (isLoading) return <Loading />
if (error)     return <ErrorState message={error} onRetry={fetchItems} />
if (items.length === 0) return <EmptyState />
return <main>...</main>   // 성공
```
- 위에서 순서대로 체크 → webCore의 render(STATE.LOADING) 패턴과 동일

### key props — 목록 렌더링 필수
```jsx
{items.map((item) => (
  <Card key={item.id} title={item.title} />
))}
```
- React가 어떤 항목이 바뀌었는지 식별하는 데 사용
- 없으면 경고 + 성능 저하

---

## ③ 내가 배운 것 (요약)

- useEffect는 렌더링 이후에 실행 — API 호출 등 사이드 이펙트 분리용
- `[]` 빈 배열 = 마운트 시 한 번만 / `[id]` = id 바뀔 때마다
- `finally`로 성공/실패 모두 로딩 상태를 종료한다
- fetchItems를 함수로 분리하면 useEffect와 "다시 시도" 버튼 모두 재사용 가능
- 배열 렌더링 시 `key` props는 필수다
