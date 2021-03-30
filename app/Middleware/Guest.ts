import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Guest middleware will check if nothe user is not authenticated.
 */
export default class Guest {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>): Promise<void> {
    const check = await auth.check()
    if (!check) {
      await next()
    }
  }
}
