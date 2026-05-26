import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useBookDetail from '../hooks/useBookDetail'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import Badge from '../components/Badge'
import { supabase } from '../lib/supabase'

const BookDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, isLoading, error, refetch } = useBookDetail(id)
  const [deleteError, setDeleteError] = useState(null)

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    setDeleteError(null)
    const { error } = await supabase.from('books').delete().eq('id', id)
    if (error) { setDeleteError('삭제 실패: ' + error.message); return }
    navigate('/books')
  }

  if (isLoading) return <Loading />
  if (error) return <ErrorState message={error} onRetry={refetch} />
  if (!item) return null

  return (
    <main>
      <button onClick={() => navigate(-1)}>← 뒤로 가기</button>
      <h1>{item.title}</h1>
      <p>저자: {item.author}</p>
      <p>상태: <Badge status={item.status} /></p>
      {item.rating && <p>평점: {'⭐'.repeat(item.rating)}</p>}
      {item.memo && <p>메모: {item.memo}</p>}
      {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
      <div>
        <button onClick={() => navigate(`/books/${id}/edit`)}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </main>
  )
}

export default BookDetail
