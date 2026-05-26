import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main>
      <h1>홈 페이지</h1>
      <p>서비스 소개 문구가 들어갑니다.</p>
      <Link to="/books">독서 목록 보러 가기</Link>
    </main>
  )
}

export default Home
