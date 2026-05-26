# 04. useState

## ① 개념 — 왜 필요한가?

일반 변수를 바꿔도 React는 모른다 → 화면 그대로.
useState로 상태를 바꿔야 React가 리렌더링한다.

```jsx
// ❌ 일반 변수 — 화면 안 바뀜
let count = 0;
<button onClick={() => { count += 1 }}>{count}</button>

// ✅ useState — 바뀌면 React가 감지 → 리렌더링
const [count, setCount] = useState(0)
<button onClick={() => setCount(count + 1)}>{count}</button>
```

### 리렌더링 흐름
```
setCount(1) 호출
    ↓
React 감지 → 컴포넌트 함수 재실행
    ↓
새 count 값으로 화면 업데이트
```

### webCore와 비교
```js
// webCore — DOM 직접 수정
count += 1;
document.querySelector('#count').textContent = count;

// React — 상태만 바꾸면 DOM은 자동
setCount(count + 1);
```

---

## ② 구현 — 핵심 코드

### controlled input 패턴
```jsx
const [title, setTitle] = useState('')

<input
  value={title}                          // state → 화면
  onChange={(e) => setTitle(e.target.value)}  // 화면 → state
/>
```
- `value`와 `onChange` 두 개가 연결되어야 controlled input
- React가 input 값을 완전히 관리 — state가 항상 실제 값

### 폼 상태 4가지
```jsx
const [title, setTitle] = useState('')        // 입력값
const [errors, setErrors] = useState({})      // 유효성 에러
const [isSubmitting, setIsSubmitting] = useState(false)  // 제출 중
```

### 유효성 검사
```jsx
const validate = () => {
  const newErrors = {}
  if (!title.trim()) newErrors.title = '제목을 입력해주세요.'
  return newErrors
}

const handleSubmit = async (e) => {
  e.preventDefault()
  const newErrors = validate()
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)   // 에러 상태 업데이트 → 에러 메시지 표시
    return
  }
  setIsSubmitting(true)    // 제출 중 상태 → 버튼 비활성화
  // API 호출
  setIsSubmitting(false)
}
```

### 상태에 따른 UI 변화
```jsx
<Button disabled={isSubmitting}>
  {isSubmitting ? '저장 중...' : '저장하기'}
</Button>
// isSubmitting 하나가 버튼 비활성화 + 텍스트 변경을 동시에 처리
```

---

## ③ 내가 배운 것 (요약)

- useState는 React에게 "상태 바뀌었으니 다시 그려"라고 알리는 방법이다
- 직접 변수를 바꾸면 React가 모른다 — 반드시 setter 함수 사용
- controlled input은 `value`(state→화면)와 `onChange`(화면→state) 두 개가 쌍으로 연결된다
- `isSubmitting` 하나로 버튼 비활성화, 텍스트 변경, 중복 제출 방지를 동시에 처리한다
- 상태 변경 → 리렌더링 → UI 변화 흐름이 React의 핵심이다
