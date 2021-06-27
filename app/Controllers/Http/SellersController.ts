import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'
import Service from 'App/Models/Service'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import Env from '@ioc:Adonis/Core/Env'
import SellerProfile from 'App/Models/SellerProfile'

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

  /**
   * Get current seller's services as a list with pagination
   * @params {number} page Current page number
   * @params {string} search Search string
   */
  public async getSellerServices({
    response,
    request,
    logger,
  }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const search = request.input('search', null)

    try {
      // Fetch seller's services for search
      const services = await Service.query().where('name', 'like', `%${search}%`).paginate(page, 20)

      return response.json(services)
    } catch (error) {
      logger.error(error)
      return response.internalServerError(error)
    }
  }

  /**
   * Link Stripe account
   */
  public async linkStripe({ response, logger, auth }: HttpContextContract): Promise<void> {
    try {
      await auth.user!.load('sellerProfile')

      const account = await Stripe.accounts.create({
        type: 'express',
      })

      auth.user!.sellerProfile.stripeAccountId = account.id
      await auth.user!.sellerProfile.save()

      const accountLinks = await Stripe.accountLinks.create({
        account: account.id,
        refresh_url: Env.get('STRIPE_REFRESH_URL'),
        return_url: Env.get('STRIPE_RETURN_URL'),
        type: 'account_onboarding',
      })

      await Stripe.accounts.retrieve(account.id)

      return response.redirect(accountLinks.url)
    } catch (error) {
      logger.error(error)
      return response.internalServerError()
    }
  }

  /**
   * Stripe connect callback
   */
  public async stripeCallback({ response, logger, auth }: HttpContextContract): Promise<void> {
    try {
      await auth.user!.load('sellerProfile')
      const id = auth.user!.sellerProfile.stripeAccountId
      if (id) {
        const account = await Stripe.accounts.retrieve(id)
        return response.redirect(
          '/profil' + (account.details_submitted ? '' : '?error=not_submitted')
        )
      } else {
        logger.error("Seller stripe ID is empty, it shouldn't be empty")
        return response.badRequest()
      }
    } catch (error) {
      logger.error(error)
      return response.internalServerError()
    }
  }

  /**
   * Stripe un
   */
  public async unlinkStripe({ response, logger, auth }: HttpContextContract): Promise<void> {
    try {
      await auth.user!.load('sellerProfile')
      const id = auth.user!.sellerProfile.stripeAccountId

      if (id) {
        await SellerProfile.query().sideload(auth.user!.sellerProfile).update({
          stripeAcountId: null,
        })
        await Stripe.accounts.del(id)

        return response.ok('')
      } else {
        return response.badRequest()
      }
    } catch (error) {
      logger.error(error)
      return response.internalServerError()
    }
  }
}
