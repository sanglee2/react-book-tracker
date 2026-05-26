# 10. 비동기 흐름과 React UI 상태

## ① 개념 — 왜 필요한가?

Supabase 쿼리처럼 결과가 바로 오지 않는 작업을 **비동기**라고 한다.
결과를 기다리는 동안 화면은 어떤 상태를 보여줄지 명확하게 설계해야 한다.

비동기 흐름은 항상 3구간으로 나뉜다:

```
요청 시작 → (기다리는 중) → 성공 or 실패
```

이게 React에서는 4가지 UI 상태가 된다:

| 상태 | 조건 | UI |
|------|------|----|
| 로딩 | `isLoading === true` | `<Loading />` |
| 실패 | `error !== null` | `<ErrorState />` |
| 빈 데이터 | `data.length === 0` | `<EmptyState />` |
| 성공 | 위 모두 아닐 때 | 실제 데이터 UI |

---

## ② 구현 — 핵심 코드

### try / catch / finally 구조

```js
const fetchItems = async () => {
  setIsLoading(true)   // 로딩 시작
  setError(null)       // 이전 에러 초기화

  try {
    // 요청 실행 — 성공하면 data 사용
    const { data, error } = await supabase.from('books').select('*')
    if (error) throw new Error(error.message)  // Supabase 에러를 JS 에러로 변환
    setItems(data)  // 성공 상태 저장

  } catch (err) {
    // 실패 시 — error 상태 저장
    setError(err.message)

  } finally {
    // 성공이든 실패든 반드시 실행 — 로딩 종료
    setIsLoading(false)
  }
}
```

**왜 `finally`에서 로딩을 끄나?**
- `try` 안에서 끄면: catch로 넘어갈 때 실행 안 됨 → 로딩이 영원히 켜진 채로 남음
- `finally`는 성공/실패 모두 보장 → 안전하게 로딩 종료 가능

### Supabase 에러 처리 방식

```js
const { data, error } = await supabase.from('books').select('*')
if (error) throw new Error(error.message)
```

Supabase는 실패해도 Promise reject가 아니라 `{ data: null, error: {...} }` 형태로 반환한다.
그래서 `if (error) throw`로 명시적으로 catch 블록으로 넘겨야 한다.

### 4가지 상태를 UI로 표현 — early return 패턴

```jsx
const BookList = () => {
  const { items, isLoading, error, refetch } = useBooks()

  if (isLoading) return <Loading />
  if (error)     return <ErrorState message={error} onRetry={refetch} />
  if (items.length === 0) return <EmptyState />

  return <main>...</main>  // 여기까지 오면 성공
}
```

### 폼 제출 실패 처리

목록 조회와 달리, 폼 제출 실패는 별도 state로 화면에 표시한다:

```jsx
const [submitError, setSubmitError] = useState(null)

const handleSubmit = async (e) => {
  e.preventDefault()
  setSubmitError(null)

  const { error } = await supabase.from('books').insert(payload)
  if (error) {
    setSubmitError('저장 실패: ' + error.message)  // 화면에 표시
    return
  }
  navigate('/books')
}

// JSX
{submitError && <p style={{ color: 'red' }}>{submitError}</p>}
```

---

## ③ 내가 배운 것 (요약)

- 비동기 흐름은 항상 로딩 / 성공 / 실패 / 빈 데이터 4가지 상태를 만든다
- `try/catch/finally`에서 finally가 로딩 종료를 담당 — 성공/실패 모두 보장
- Supabase는 에러를 reject가 아닌 `{ error }` 객체로 반환 → `if (error) throw`로 catch로 넘겨야 함
- early return 패턴으로 각 상태를 순서대로 처리하면 코드가 간결해진다
- 폼 제출 실패는 `alert()` 대신 state로 관리해서 화면 안에 표시해야 한다
