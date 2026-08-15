const MEMBERSHIP_RULES = Object.freeze({
  Mensual: { months: 1, value: 80000 },
  Trimestral: { months: 3, value: 210000 },
  Anual: { months: 12, value: 720000 },
})

export function membershipRule(type) {
  const rule = MEMBERSHIP_RULES[type]
  if (!rule) throw new Error('El tipo debe ser Mensual, Trimestral o Anual')
  return rule
}

export function addMonths(dateInput, months) {
  const date = new Date(`${dateInput}T12:00:00Z`)
  if (Number.isNaN(date.getTime())) throw new Error('Fecha inicial inválida')
  date.setUTCMonth(date.getUTCMonth() + months)
  return date.toISOString().slice(0, 10)
}

export function createMembership(type, startDate = new Date().toISOString().slice(0, 10)) {
  const rule = membershipRule(type)
  return { tipo: type, valor: rule.value, fechaInicio: startDate, fechaFin: addMonths(startDate, rule.months) }
}

export { MEMBERSHIP_RULES }
