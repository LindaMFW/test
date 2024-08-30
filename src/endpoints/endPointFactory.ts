import { test as baseTest } from '@playwright/test'
import { LoginApi } from './newFeature/login/login'
import { RegisterAccountApi } from './newFeature/registerAccount/registerAccount'
import { LogoutApi } from './newFeature/logout/logout'
type endpoints = {
  loginApi: LoginApi
  registerAccountApi: RegisterAccountApi
  logoutApi: LogoutApi
}

const endpointFactory = baseTest.extend<endpoints>({
  loginApi: async ({ request }, use) => {
    await use(new LoginApi(request))
  },
  registerAccountApi: async ({ request }, use) => {
    await use(new RegisterAccountApi(request))
  },
  logoutApi: async ({ request }, use) => {
    await use(new LogoutApi(request))
  },
})

export const test = endpointFactory
export const expect = endpointFactory.expect
