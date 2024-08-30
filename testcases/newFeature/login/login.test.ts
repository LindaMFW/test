import { test } from "@steps/steps"

test.describe('Login Test', () => {
  test('Should login successfully', async ({ newFeatureStep }) => {
    const email = 'validEmail@gmail.com'
    const password = 'validPassword'
    const response = await newFeatureStep.login(email, password)
    test.expect(response.status).toBe(200)
  })

  test('Should fail when email is blank', async ({ newFeatureStep }) => {
    const email = ''
    const password = 'validPassword'
    const response = await newFeatureStep.login(email, password)
    test.expect(response.status).toBe(400)
  })

  test('Should fail when password is blank', async ({ newFeatureStep }) => {
    const email = 'validEmail@gmail.com'
    const password = ''
    const response = await newFeatureStep.login(email, password)
    test.expect(response.status).toBe(400)
  })

  test('Should fail when email is invalid', async ({ newFeatureStep }) => {
    const email = 'invalidEmail'
    const password = 'validPassword'
    const response = await newFeatureStep.login(email, password)
    test.expect(response.status).toBe(400)
  })

  test('Should fail when password is invalid', async ({ newFeatureStep }) => {
    const email = 'validEmail@gmail.com'
    const password = 'invalidPassword'
    const response = await newFeatureStep.login(email, password)
    test.expect(response.status).toBe(400)
  })

})