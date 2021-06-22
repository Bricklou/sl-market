import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Admin middleware will check two conditions:
 * - is the user authenticated
 * - is the user has the `admin` role
 * A 401 (unauthorized) response will be thrown if one of them is not verified.
 */
export default class Admin {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ): Promise<void> {
    if (auth.isAuthenticated && auth.user!.hasRole('admin')) {
      return await next()
    }
    return response.unauthorized()
  }
}
