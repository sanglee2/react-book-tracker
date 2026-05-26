# 01. React 컴포넌트 / 프로젝트 세팅

## ① 개념 — 왜 필요한가?

### webCore와의 차이
```js
// webCore — innerHTML로 HTML 문자열 직접 생성
container.innerHTML = `<a class="project-card">...</a>`;

// React — 컴포넌트 함수가 UI를 반환
const ItemCard = ({ name, description }) => (
  <a className="project-card">
    <h3>{name}</h3>
    <p>{description}</p>
  </a>
);
```
컴포넌트 = 데이터(props)를 받아 UI(JSX)를 반환하는 함수.
재사용, 분리, 유지보수가 목적.

---

## ② 구현 — 프로젝트 세팅

### 도구 선택: Vite + React
- Vite: 빠른 개발 서버 + 빌드 도구
- `npm create vite@latest . -- --template react`

### 설치한 패키지
```bash
npm install           # 기본 의존성
npm install react-router-dom  # 라우팅
```

### 폴더 구조
```
src/
├── pages/       # 라우트 단위 화면 (/items, /items/:id 등)
├── components/  # 재사용 컴포넌트 (Button, Card, Loading 등)
├── hooks/       # 커스텀 훅 (useItems, useItemDetail 등)
└── lib/         # 외부 서비스 클라이언트 (Supabase 등)
```

### main.jsx — 앱 진입점
```jsx
createRoot(document.getElementById('root')).render(<App />)
```
- index.html의 `<div id="root">`에 React 앱을 연결
- webCore의 `document.querySelector('#app')`과 같은 개념

---

## ③ 내가 배운 것 (요약)

- React 컴포넌트는 props를 받아 JSX를 반환하는 함수다
- innerHTML 방식 대신 컴포넌트로 쪼개면 재사용과 유지보수가 쉬워진다
- Vite는 React 개발 환경을 빠르게 세팅해주는 도구다
- pages/components/hooks/lib 구조로 역할을 분리한다
