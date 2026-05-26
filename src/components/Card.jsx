import Badge from './Badge'

const Card = ({ title, description, status, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3 className="card__title">{title}</h3>
      {description && <p className="card__desc">{description}</p>}
      {status && <Badge status={status} />}
    </div>
  )
}

export default Card
