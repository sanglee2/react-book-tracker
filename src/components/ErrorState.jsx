const ErrorState = ({ message = '요청에 실패했습니다.', onRetry }) => {
  return (
    <div className="state-box">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>다시 시도</button>}
    </div>
  )
}

export default ErrorState
