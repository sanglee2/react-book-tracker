const STATUS_STYLE = {
  '읽고 싶음': { background: '#e8f4fd', color: '#1a73e8' },
  '읽는 중': { background: '#fff3e0', color: '#e65100' },
  '다 읽음': { background: '#e8f5e9', color: '#2e7d32' },
}

const Badge = ({ status }) => {
  const style = STATUS_STYLE[status] ?? { background: '#f0f0f0', color: '#555' }
  return (
    <span style={{ ...style, padding: '2px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }}>
      {status}
    </span>
  )
}

export default Badge
