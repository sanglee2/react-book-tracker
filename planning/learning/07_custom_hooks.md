# 07. 커스텀 훅

## ① 개념 — 왜 필요한가?

페이지마다 반복되는 상태 + 비동기 로직을 훅으로 추출해서 재사용한다.

```
페이지 컴포넌트 → "어떻게 보여줄지" (JSX)
커스텀 훅      → "데이터를 어떻게 가져올지" (상태 + 비동기)
```

webCore에서 fetchProjects()와 render()를 분리했던 것과 같은 개념.

### 규칙
- 이름이 반드시 `use`로 시작 — React가 훅으로 인식
- 내부에서 useState, useEffect 등 훅 사용 가능

---

## ② 구현 — 핵심 코드

### useItems.js
```js
const useItems = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchItems = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('불러오지 못했습니다.')
      setItems(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])   // 빈 배열 — 함수 고정 (매 렌더링마다 새로 만들어지지 않게)

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return { items, isLoading, error, refetch: fetchItems }
}
```

### useCallback이 필요한 이유
```js
// useCallback 없으면
// 리렌더링 → fetchItems 새 함수 생성 → useEffect 재실행 → 무한 루프
const fetchItems = useCallback(async () => { ... }, [])
// useCallback으로 고정 → useEffect는 처음 한 번만 실행
```

### useItemDetail.js — 인자로 id 받기
```js
const useItemDetail = (id) => {
  const fetchItem = useCallback(async () => {
    if (!id) return   // id 없으면 요청 안 함 (안전 처리)
    ...
  }, [id])   // id 바뀌면 새 함수 → useEffect 재실행 → 새 데이터 요청
}
```

### 페이지에서 사용
```jsx
// 전 — 50줄
const [items, setItems] = useState([])
const [isLoading, ...] = useState(true)
...useEffect...

// 후 — 한 줄
const { items, isLoading, error, refetch } = useItems()
```

---

## ③ 내가 배운 것 (요약)

- 커스텀 훅은 반복되는 로직을 재사용하기 위한 함수다 — 이름은 반드시 use로 시작
- useCallback으로 함수를 메모이제이션하지 않으면 useEffect가 무한 실행될 수 있다
- 훅은 상태와 함수를 객체로 반환해서 페이지에서 구조분해 할당으로 꺼낸다
- 페이지는 렌더링만, 훅은 로직만 담당 — 역할 분리
