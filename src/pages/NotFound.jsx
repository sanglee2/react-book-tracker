import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--border)', marginBottom: '12px' }}>404</div>
      <h2 style={{ marginBottom: '8px' }}>페이지를 찾을 수 없습니다</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '28px' }}>주소를 다시 확인해주세요.</p>
      <Link to="/"><button className="btn btn--primary">홈으로 돌아가기</button></Link>
    </main>
  )
}

export default NotFound
