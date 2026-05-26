const Card = ({ title, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3 className="card__title">{title}</h3>
      {description && <p className="card__desc">{description}</p>}
    </div>
  )
}

export default Card
