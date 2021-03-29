import { AxiosResponse } from 'axios'
import { UserInfo } from '../store/modules/user'
import api from './api'

/**
 * Authentication helper
 */
class Auth {
  /**
   * Logout the user
   */
  public static async logout(): Promise<AxiosResponse<void>> {
    return await api.delete<void>('/auth')
  }
  /**
   * Refresh the user informations
   */
  public static async refresh(): Promise<AxiosResponse<UserInfo>> {
    return await api.put<UserInfo>('/auth')
  }

  /**
   * Fetch the user informations
   */
  public static async get(): Promise<AxiosResponse<UserInfo>> {
    return await api.get<UserInfo>('/auth')
  }

  /**
   * Login the user with the discord provided token
   */
  public static async loginWithToken(code: string): Promise<AxiosResponse<UserInfo>> {
    return await api.post<UserInfo>('/auth', {
      code,
    })
  }
}

export default Auth
