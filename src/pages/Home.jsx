import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📚</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>나의 독서 기록</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.7 }}>
        읽은 책, 읽고 싶은 책을 기록하고 관리하세요.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link to="/books">
          <button className="btn btn--primary">독서 목록 보기</button>
        </Link>
        <Link to="/books/new">
          <button className="btn btn--outline">책 추가하기</button>
        </Link>
      </div>
    </main>
  )
}

export default Home
