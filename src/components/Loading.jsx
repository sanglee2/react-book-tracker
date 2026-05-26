const Loading = ({ message = '불러오는 중...' }) => {
  return (
    <div className="state-box">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  )
}

export default Loading
