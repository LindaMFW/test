// Create API logout
// Method: POST
// Token: required
// Response: { message: string }
// Description: Logout user and return message

import envConfig from "@resources/env/envConfig"
import { APIRequestContext } from "playwright"

export class LogoutApi {
  private readonly logoutRequest: APIRequestContext

  constructor(request: APIRequestContext) {
    this.logoutRequest = request
  }

  async logout(token: string) {
    return await this.logoutRequest.post(`${envConfig.baseUrl}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  async logoutAndGetResponse(token: string) {
    return await (await this.logout(token)).json()
  }
}
