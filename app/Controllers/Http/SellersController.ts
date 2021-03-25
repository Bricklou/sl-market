import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class SellersController {
  public async getSellerStatus({ request, response, auth }: HttpContextContract) {
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

  public async updateSellerStatus({ request, response, auth }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        status: schema.enum(['available', 'unavailable', 'vacation'] as const),
      }),
    })
    await auth.user!.preload('sellerProfile')

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
}
