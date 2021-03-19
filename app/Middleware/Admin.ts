import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.isAuthenticated && auth.user!.hasRole('admin')) {
      return next()
    }
    return response.unauthorized()
  }
}
