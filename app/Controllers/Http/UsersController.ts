import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stripe from '@ioc:Adonis/Addons/Stripe'

export default class UsersController {
  public async getProfile({ response, auth }: HttpContextContract): Promise<void> {
    let json = {
      isStripeLinked: false,
      isSeller: false,
    }

    if (await auth.user!.hasRole('seller')) {
      const sellerProfile = await auth.user!.related('sellerProfile').query().first()
      json.isSeller = true

      if (sellerProfile && sellerProfile.isStripeLinked) {
        try {
          await Stripe.accounts.retrieve(sellerProfile.stripeAccountId!)
          json.isStripeLinked = true
        } catch (error) {
          sellerProfile.stripeAccountId = undefined
          await sellerProfile.save()
        }
      } else {
        json.isStripeLinked = false
      }
    } else {
      console.log('is not a seller')
    }
    return response.json(json)
  }
}
