# React SPA 구현 전략

## 프로젝트 구조
```
React_SPA/
├── src/
│   ├── pages/          # 라우트 단위 화면
│   ├── components/     # 재사용 컴포넌트
│   ├── hooks/          # 커스텀 훅
│   ├── lib/            # Supabase 클라이언트 등 유틸
│   └── App.jsx         # 라우터 설정
├── docs/               # 과제 명세
└── planning/           # 전략 문서
    └── learning/       # 학습 노트
```

---

## 학습 방법론

### 추천 학습 사이클
각 개념마다 이 3단계를 반복한다:

`① 개념 이해 → ② 직접 구현 → ③ 정리/아카이빙`

### 구체적인 방법

**① 개념 이해**
- Claude에게 "왜 이게 필요한지"부터 물어보기
- 코드 먼저 받지 말고, 개념과 흐름을 먼저 이해

**② 직접 구현**
- 본인이 먼저 코드를 써보고, 막히면 힌트 요청
- 완성 코드를 받아도 반드시 한 줄씩 설명 듣기

**③ 정리/아카이빙**
- `planning/learning/` 폴더에 개념별 학습 노트 저장
- "내가 배운 것"을 내 말로 요약

### 학습 순서

| 단계 | 개념 | 구현 |
|------|------|------|
| 1 | React 컴포넌트란? | 프로젝트 세팅 + App.jsx |
| 2 | JSX란? | 기본 컴포넌트 작성 |
| 3 | props vs state란? | 재사용 컴포넌트 분리 |
| 4 | useState란? | 폼 controlled input |
| 5 | useEffect란? | 데이터 패칭 흐름 |
| 6 | React Router란? | 라우팅 5개 구성 |
| 7 | 커스텀 훅이란? | useItems(), useItemDetail() |
| 8 | Supabase 연동 | CRUD 구현 |
| 9 | 상태 관리 패턴 | 로딩/에러/빈 상태 UI |

---

## 라우트 구성 (최소 5개)
| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | Home | 서비스 소개 |
| `/items` | ItemList | 목록 조회 |
| `/items/:id` | ItemDetail | 상세 조회 |
| `/items/new` | ItemForm | 등록 |
| `/items/:id/edit` | ItemForm | 수정 |
| `*` | NotFound | 404 |

## 재사용 컴포넌트 목록 (최소 8개)
- `Button` — variant(primary/outline/danger) props
- `Input` — label, error 메시지 포함
- `Card` — 목록 아이템 카드
- `Loading` — 스피너
- `EmptyState` — 빈 데이터 UI
- `ErrorState` — 에러 + 재시도 버튼
- `ItemList` — 카드 목록 컨테이너
- `ItemForm` — 등록/수정 공용 폼

---

## 핵심 제약 사항
- React 18 이상
- 백엔드: Supabase 또는 Firebase
- API Key → `.env` 파일 관리, `.gitignore` 등록 필수
- 배포: Vercel 또는 Netlify
- 페이지/컴포넌트/훅 폴더 분리 필수

---

## 서비스 주제
📚 독서 기록 — 읽은 책/읽고 싶은 책 등록·조회·수정·삭제

### 데이터 구조 (Supabase books 테이블)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | int8 | PK |
| title | text | 제목 |
| author | text | 저자 |
| status | text | 읽는 중 / 완독 / 읽고 싶음 |
| rating | int2 | 별점 1~5 |
| memo | text | 한 줄 감상 |
| created_at | timestamptz | 생성일 |

### 라우트
| 경로 | 페이지 |
|------|--------|
| `/` | Home |
| `/books` | BookList |
| `/books/:id` | BookDetail |
| `/books/new` | BookForm |
| `/books/:id/edit` | BookForm |
| `*` | NotFound |

---

## 변경 히스토리

| 날짜 | 내용 |
|------|------|
| 2026-05-20 | 초기 전략 수립 |
