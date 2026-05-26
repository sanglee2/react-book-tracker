import { useNavigate } from 'react-router-dom'
import useBooks from '../hooks/useBooks'
import Card from '../components/Card'
import Loading from '../components/Loading'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'

const BookList = () => {
  const navigate = useNavigate()
  const { items, isLoading, error, refetch } = useBooks()

  if (isLoading) return <Loading />
  if (error) return <ErrorState message={error} onRetry={refetch} />
  if (items.length === 0) return <EmptyState />

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>독서 목록</h1>
        <button onClick={() => navigate('/books/new')}>+ 책 추가</button>
      </div>
      <div className="item-grid">
        {items.map((book) => (
          <Card
            key={book.id}
            title={book.title}
            description={book.author}
            status={book.status}
            onClick={() => navigate(`/books/${book.id}`)}
          />
        ))}
      </div>
    </main>
  )
}

export default BookList
