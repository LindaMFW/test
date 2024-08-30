// Create API to register account
// Method: POST
// Token: required
// Params: {name: string, location: string, email: string, password: string}
// Response: {id: string, name: string, location: string, email: string}
// Description: Register account and return account information

import envConfig from '@resources/env/envConfig'
import { APIRequestContext } from 'playwright'
import { IregisterAccountRequest } from './iRegisterAccountRequest'

export class RegisterAccountApi {
  private readonly registerAccountRequest: APIRequestContext

  constructor(request: APIRequestContext) {
    this.registerAccountRequest = request
  }

  async registerAccount(token: string, data: IregisterAccountRequest) {
    return await this.registerAccountRequest.post(`${envConfig.baseUrl}/registerAccount`, {
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  async registerAccountAndGetResponse(token: string, data: IregisterAccountRequest) {
    return await (await this.registerAccount(token, data)).json()
  }
}
