import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async getProfile({ response, auth }: HttpContextContract): Promise<void> {
    let json = {
      isStripeLinked: false,
      isSeller: false,
    }

    if (await auth.user!.hasRole('seller')) {
      const sellerProfile = await auth.user!.related('sellerProfile').query().first()
      json.isSeller = true

      json.isStripeLinked = sellerProfile !== null && sellerProfile.stripeAccountId !== undefined
    } else {
      console.log('is not a seller')
    }
    return response.json(json)
  }
}
