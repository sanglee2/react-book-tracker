# 📚 독서 기록 앱

읽은 책, 읽고 싶은 책을 기록하고 관리하는 React SPA입니다.

## 배포 URL

https://tiny-queijadas-d53267.netlify.app

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | React 19, React Router v7 |
| Build Tool | Vite |
| Backend | Supabase (PostgreSQL) |
| Deployment | Netlify |

## 로컬 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/sanglee2/react-book-tracker.git
cd react-book-tracker

# 2. 패키지 설치
npm install

# 3. 환경변수 설정
cp .env.example .env
# .env 파일에 Supabase URL과 anon key 입력

# 4. 개발 서버 실행
npm run dev
```

## 환경변수

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 주요 기능

- 책 목록 조회
- 책 상세 조회
- 책 등록 (제목, 저자, 독서 상태, 평점, 메모)
- 책 수정
- 책 삭제

## 폴더 구조

```
src/
├── pages/       # 라우트 단위 화면
├── components/  # 재사용 UI 컴포넌트
├── hooks/       # 커스텀 훅
└── lib/         # Supabase 클라이언트
```
