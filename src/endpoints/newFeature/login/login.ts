// create API login
// Method: POST
// Params: { email: string, password: string }
// Response: { token: string }
// Description: Login user and return token

import envConfig from '@resources/env/envConfig'
import { APIRequestContext } from 'playwright'

export class LoginApi {
  private readonly loginRequest: APIRequestContext

  constructor(request: APIRequestContext) {
    this.loginRequest = request
  }

  async login(email: string, password: string) {
    return await this.loginRequest.post(`${envConfig.baseUrl}/login`, {
      data: {
        email,
        password,
      },
    })
  }

  async loginAndGetToken(email: string, password: string) {
    const response = await (await this.login(email, password)).json()
    return response.token
  }

  async loginAndGetResponse(email: string, password: string) {
    return await (await this.login(email, password)).json()
  }
}
