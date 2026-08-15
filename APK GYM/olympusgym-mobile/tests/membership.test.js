import test from 'node:test'
import assert from 'node:assert/strict'
import { addMonths, createMembership, membershipRule } from '../src/domain/membership.js'

test('plan mensual cuesta 80000', () => assert.equal(membershipRule('Mensual').value, 80000))
test('plan trimestral cuesta 210000', () => assert.equal(membershipRule('Trimestral').value, 210000))
test('plan anual finaliza doce meses después', () => assert.equal(createMembership('Anual', '2026-08-14').fechaFin, '2027-08-14'))
test('suma meses conservando formato ISO', () => assert.equal(addMonths('2026-08-14', 3), '2026-11-14'))
test('rechaza un tipo desconocido', () => assert.throws(() => membershipRule('Semanal'), /Mensual/))
