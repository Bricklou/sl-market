import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Seller {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.isAuthenticated && auth.user!.hasRole('seller')) {
      return next()
    }
    return response.unauthorized()
  }
}
