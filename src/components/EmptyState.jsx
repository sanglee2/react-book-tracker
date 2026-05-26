const EmptyState = ({ message = '표시할 데이터가 없습니다.' }) => {
  return (
    <div className="state-box">
      <p>{message}</p>
    </div>
  )
}

export default EmptyState
