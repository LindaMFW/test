import { REGISTER_DATA } from '@resources/data/newFeature/registerAccount/registerData'
import { test } from '@steps/steps'

test.describe('Register Account', () => {
  let token = ''
  test.beforeEach(async ({ newFeatureStep }) => {
    token = await newFeatureStep.loginAndGetToken('test@example.com', 'password')
  })

  test.afterEach(async ({ newFeatureStep }) => {
    await newFeatureStep.logout(token)
  })

  test('Should register account successfully', async ({ newFeatureStep }) => {
    const response = await newFeatureStep.registerAccount(token, REGISTER_DATA)
    test.expect(response.status()).toBe(200)
  })

  test('Should fail when name is blank', async ({ newFeatureStep }) => {
    const response = await newFeatureStep.registerAccount(token, { ...REGISTER_DATA, name: '' })
    test.expect(response.status()).toBe(400)
  })

  test('Should fail when location is blank', async ({ newFeatureStep }) => {
    const response = await newFeatureStep.registerAccount(token, { ...REGISTER_DATA, location: '' })
    test.expect(response.status()).toBe(400)
  })

  test('Should fail when email is blank', async ({ newFeatureStep }) => {
    const response = await newFeatureStep.registerAccount(token, { ...REGISTER_DATA, email: '' })
    test.expect(response.status()).toBe(400)
  })

  test('Should fail when password is blank', async ({ newFeatureStep }) => {
    const response = await newFeatureStep.registerAccount(token, { ...REGISTER_DATA, password: '' })
    test.expect(response.status()).toBe(400)
  })

  test('Should fail when email is invalid', async ({ newFeatureStep }) => {
    const response = await newFeatureStep.registerAccount(token, { ...REGISTER_DATA, email: 'invalidEmail' })
    test.expect(response.status()).toBe(400)
  })

  test('Should fail when password is invalid', async ({ newFeatureStep }) => {
    const response = await newFeatureStep.registerAccount(token, { ...REGISTER_DATA, password: 'invalidPassword' })
    test.expect(response.status()).toBe(400)
  })

  test('Should fail when invalid token', async ({ newFeatureStep }) => {
    const response = await newFeatureStep.registerAccount('invalidToken', REGISTER_DATA)
    test.expect(response.status()).toBe(400)
  })
})
