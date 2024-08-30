// loginAPI, params: email, password
// registerAccountAPI, token: require, data: IregisterAccountRequest
// logoutAPI, token: require

import { LoginApi } from "@endpoints/newFeature/login/login"
import { LogoutApi } from "@endpoints/newFeature/logout/logout"
import { IregisterAccountRequest } from "@endpoints/newFeature/registerAccount/iRegisterAccountRequest"
import { RegisterAccountApi } from "@endpoints/newFeature/registerAccount/registerAccount"

export class NewFeatureStep {
  private readonly loginAPI: LoginApi
  private readonly registerAccountAPI: RegisterAccountApi
  private readonly logoutAPI: LogoutApi

  constructor(
    loginAPI: LoginApi,
    registerAccountAPI: RegisterAccountApi,
    logoutAPI: LogoutApi
  ) {
    this.loginAPI = loginAPI
    this.registerAccountAPI = registerAccountAPI
    this.logoutAPI = logoutAPI
  }

  async login(email: string, password: string) {
    return await this.loginAPI.login(email, password)
  }

  async loginAndGetToken(email: string, password: string) {
    return await this.loginAPI.loginAndGetToken(email, password)
  }

  async registerAccount(token: string, data: IregisterAccountRequest) {
    return await this.registerAccountAPI.registerAccount(token, data)
  }

  async registerAccountAndGetResponse(token: string, data: IregisterAccountRequest) {
    return await this.registerAccountAPI.registerAccountAndGetResponse(token, data)
  }

  async logout(token: string) {
    return await this.logoutAPI.logout(token)
  }

  async logoutAndGetResponse(token: string) {
    return await this.logoutAPI.logoutAndGetResponse(token)
  }
}
