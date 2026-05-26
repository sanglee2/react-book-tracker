const Input = ({ label, id, value, onChange, error, placeholder }) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'input input--error' : 'input'}
      />
      {error && <span className="input__error">{error}</span>}
    </div>
  )
}

export default Input
