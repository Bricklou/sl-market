import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Seller middleware will check two conditions:
 * - is the user authenticated
 * - is the user has the `seller` role
 * A 401 (unauthorized) response will thrown if one of them is not verified.
 */
export default class Seller {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.isAuthenticated && auth.user!.hasRole('seller')) {
      return next()
    }
    return response.unauthorized()
  }
}
