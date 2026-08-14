export default function FormField({ label, hint, ...inputProps }) {
  const inputId = inputProps.id ?? inputProps.name

  return (
    <label className="form-field" htmlFor={inputId}>
      <span>{label}</span>
      <input id={inputId} {...inputProps} />
      {hint && <small>{hint}</small>}
    </label>
  )
}
