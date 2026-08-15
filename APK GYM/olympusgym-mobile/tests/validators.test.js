import test from 'node:test'
import assert from 'node:assert/strict'
import { hasErrors, positiveInteger, validateEmail, validateLogin, validateRegister } from '../src/utils/validators.js'

test('acepta un correo válido', () => assert.equal(validateEmail('edgar@olympusgym.test'), ''))
test('rechaza un correo sin formato', () => assert.match(validateEmail('edgar'), /válido/))
test('login exige contraseña de ocho caracteres', () => assert.equal(hasErrors(validateLogin({ email: 'a@b.co', password: '123' })), true))
test('registro válido no contiene errores', () => assert.equal(hasErrors(validateRegister({ nombreCompleto: 'Edgar Rodríguez', email: 'edgar@olympusgym.test', password: 'Olympus123*' })), false))
test('valida enteros positivos', () => assert.equal(positiveInteger('4', 'Series', 20), ''))
test('rechaza repeticiones fuera del rango', () => assert.match(positiveInteger('101', 'Repeticiones', 100), /entre 1 y 100/))
