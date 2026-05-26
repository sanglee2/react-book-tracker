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
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.875rem', padding: 0, marginBottom: '16px', cursor: 'pointer' }}
      >
        ← 뒤로 가기
      </button>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '32px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>{item.title}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{item.author}</p>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 20px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '52px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>상태</span>
            <Badge status={item.status} />
          </div>

          {item.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '52px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>평점</span>
              <span>{'⭐'.repeat(item.rating)}</span>
            </div>
          )}

          {item.memo && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ width: '52px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', paddingTop: '2px' }}>메모</span>
              <p style={{ background: 'var(--bg)', borderLeft: '3px solid var(--primary)', padding: '10px 14px', borderRadius: '0 8px 8px 0', lineHeight: 1.7, flex: 1 }}>{item.memo}</p>
            </div>
          )}
        </div>

        {deleteError && (
          <p style={{ color: 'var(--danger)', fontSize: '0.875rem', marginTop: '16px' }}>{deleteError}</p>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '28px' }}>
          <button className="btn btn--outline" onClick={() => navigate(`/books/${id}/edit`)}>수정</button>
          <button className="btn btn--danger" onClick={handleDelete}>삭제</button>
        </div>
      </div>
    </main>
  )
}

export default BookDetail
