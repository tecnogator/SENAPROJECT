const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value = '') {
  if (!value.trim()) return 'El correo es obligatorio.'
  if (!EMAIL_PATTERN.test(value.trim())) return 'Ingrese un correo válido.'
  return ''
}

export function validatePassword(value = '') {
  if (!value) return 'La contraseña es obligatoria.'
  if (value.length < 8) return 'Debe contener al menos 8 caracteres.'
  return ''
}

export function validateLogin({ email = '', password = '' }) {
  return { email: validateEmail(email), password: validatePassword(password) }
}

export function validateRegister({ nombreCompleto = '', email = '', password = '' }) {
  return {
    nombreCompleto: nombreCompleto.trim().length >= 3 ? '' : 'Ingrese el nombre completo.',
    email: validateEmail(email),
    password: validatePassword(password),
  }
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean)
}

export function positiveInteger(value, label, max = 100) {
  const number = Number(value)
  if (!Number.isInteger(number) || number < 1 || number > max) return `${label} debe estar entre 1 y ${max}.`
  return ''
}
