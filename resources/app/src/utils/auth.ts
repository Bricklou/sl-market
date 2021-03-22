import { UserInfo } from '../store/modules/user'
import api from './api'

class Auth {
  async logout() {
    return await api.delete<null>('/auth')
  }
  async refresh() {
    return await api.put<UserInfo>('/auth')
  }

  async get() {
    return await api.get<UserInfo>('/auth')
  }

  async loginWithToken(code: string) {
    return await api.post<UserInfo>('/auth', {
      code,
    })
  }
}

export default new Auth()
