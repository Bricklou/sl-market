import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    const check = await auth.check()
    if (!check) {
      await next()
    }
  }
}
