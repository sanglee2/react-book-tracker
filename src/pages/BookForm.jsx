import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Input from '../components/Input'
import Button from '../components/Button'
import Loading from '../components/Loading'

const STATUS_OPTIONS = ['읽고 싶음', '읽는 중', '다 읽음']

const BookForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ title: '', author: '', status: '읽고 싶음', rating: '', memo: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState(null)
  const [isLoading, setIsLoading] = useState(isEdit)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    const fetchBook = async () => {
      const { data, error } = await supabase.from('books').select('*').eq('id', id).single()
      if (error) { setSubmitError('책 정보를 불러오지 못했습니다.'); setIsLoading(false); return }
      setForm({ title: data.title, author: data.author, status: data.status, rating: data.rating ?? '', memo: data.memo ?? '' })
      setIsLoading(false)
    }
    fetchBook()
  }, [id, isEdit])

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = '제목을 입력해주세요.'
    if (!form.author.trim()) newErrors.author = '저자를 입력해주세요.'
    return newErrors
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setIsSubmitting(true)
    setErrors({})
    setSubmitError(null)

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status,
      rating: form.rating ? Number(form.rating) : null,
      memo: form.memo.trim() || null,
    }

    const { error } = isEdit
      ? await supabase.from('books').update(payload).eq('id', id)
      : await supabase.from('books').insert(payload)

    if (error) { setSubmitError('저장 실패: ' + error.message); setIsSubmitting(false); return }
    navigate(isEdit ? `/books/${id}` : '/books')
  }

  if (isLoading) return <Loading />

  return (
    <main>
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.875rem', padding: 0, marginBottom: '16px', cursor: 'pointer' }}
      >
        ← 뒤로 가기
      </button>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '32px', maxWidth: '520px' }}>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px' }}>{isEdit ? '책 수정' : '책 추가'}</h1>

        {submitError && (
          <p style={{ color: 'var(--danger)', fontSize: '0.875rem', background: '#fef2f2', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px' }}>
            {submitError}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <Input label="제목 *" id="title" value={form.title} onChange={handleChange} error={errors.title} placeholder="책 제목을 입력하세요" />
          <Input label="저자 *" id="author" value={form.author} onChange={handleChange} error={errors.author} placeholder="저자를 입력하세요" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '16px' }}>
            <label htmlFor="status" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>독서 상태</label>
            <select
              id="status"
              value={form.status}
              onChange={handleChange}
              style={{ padding: '9px 12px', border: '1.5px solid var(--border)', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit', background: 'var(--surface)', outline: 'none' }}
            >
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <Input label="평점 (1~5)" id="rating" type="number" value={form.rating} onChange={handleChange} placeholder="선택사항" />
          <Input label="메모" id="memo" value={form.memo} onChange={handleChange} placeholder="한 줄 감상을 남겨보세요 (선택사항)" />

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : '저장하기'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>취소</Button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default BookForm
