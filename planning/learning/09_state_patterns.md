# 09. 상태 관리 패턴 (로딩/에러/빈 상태 UI)

## 왜 필요해?

데이터를 불러오는 모든 화면은 항상 4가지 상태를 가진다.
처리하지 않으면 유저가 빈 화면을 보게 되거나, 에러가 나도 아무 안내가 없다.

## 4가지 상태

| 상태 | 조건 | UI |
|------|------|-----|
| 로딩 중 | `isLoading === true` | 스피너 |
| 에러 | `error !== null` | 에러 메시지 + 재시도 버튼 |
| 빈 데이터 | `items.length === 0` | "아직 등록된 책이 없어요" |
| 정상 | 위 모두 아닐 때 | 실제 목록 UI |

## 구현 패턴 — early return

```jsx
const BookList = () => {
  const { items, isLoading, error, refetch } = useBooks()

  if (isLoading) return <Loading />
  if (error) return <ErrorState message={error} onRetry={refetch} />
  if (items.length === 0) return <EmptyState />

  return (
    // 정상 UI
  )
}
```

순서가 중요하다. 위에서부터 조건을 체크하고, 해당되면 즉시 return(early return).
모두 통과하면 정상 UI가 렌더된다.

## 재사용 컴포넌트로 분리하는 이유

Loading, ErrorState, EmptyState를 컴포넌트로 분리하면
BookList, BookDetail 등 여러 페이지에서 동일하게 사용할 수 있다.

```
src/components/
  Loading.jsx     ← 스피너
  ErrorState.jsx  ← 에러 메시지 + onRetry 버튼
  EmptyState.jsx  ← 빈 상태 안내
```

## custom hook과의 연결

```js
// useBooks.js
return { items, isLoading, error, refetch }
```

hook이 isLoading, error, refetch를 함께 반환하기 때문에
페이지 컴포넌트에서 상태별 UI를 쉽게 처리할 수 있다.
