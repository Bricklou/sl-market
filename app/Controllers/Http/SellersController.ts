import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'

/**
 * Seller controller will contain all controllers related to the authentication.
 */
export default class SellersController {
  /**
   * Get seller status between `available`, `unavalable` and `vacations`.
   *
   * @param {string} id User ID
   */
  public async getSellerStatus({ request, response, auth }: HttpContextContract): Promise<void> {
    const id = request.input('id', auth.user?.id)

    if (id) {
      const user = await User.query().preload('sellerProfile').where('id', id).first()

      if (!user) {
        return response.notFound('user not found')
      }

      if (user.sellerProfile) {
        return response.ok(user.sellerProfile)
      }
    }
    return response.methodNotAllowed()
  }

  /**
   * Update seller status
   * @param {string} status The new status for the seller
   */
  public async updateSellerStatus({ request, response, auth }: HttpContextContract): Promise<void> {
    const data = await request.validate({
      schema: schema.create({
        status: schema.enum(['available', 'unavailable', 'vacation'] as const),
      }),
    })
    await auth.user!.load('sellerProfile')

    if (auth.user!.sellerProfile) {
      const profile = auth.user!.sellerProfile
      profile.status = data.status
      profile.save()

      return response.ok({
        status: profile.status,
      })
    }
    return response.forbidden()
  }

  /**
   * Update seller description
   * @apram {string} bio The biography of the seller
   */
  public async updateSellerBiography({
    request,
    response,
    auth,
  }: HttpContextContract): Promise<void> {
    const data = await request.validate({
      schema: schema.create({
        content: schema.string(),
      }),
    })

    await auth.user!.load('sellerProfile')

    if (auth.user!.sellerProfile) {
      const profile = auth.user!.sellerProfile
      profile.bio = data.content
      profile.save()

      return response.ok('')
    }
    return response.forbidden()
  }
}
