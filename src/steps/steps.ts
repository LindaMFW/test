import { test as baseTest } from '@endpoints/endPointFactory'
import { NewFeatureStep } from './newFeatureStep'

type steps = {
  newFeatureStep: NewFeatureStep
}

const steps = baseTest.extend<steps>({
  // create newFeatureStep contains login, register, logout steps
  newFeatureStep: async ({ loginApi, registerAccountApi, logoutApi }, use) => {
    await use(new NewFeatureStep(
      loginApi,
      registerAccountApi,
      logoutApi
    ))
  },

})

export const test = steps
export const expect = steps.expect
