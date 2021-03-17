import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import DiscordOAuth2 from 'discord-oauth2'
import { DateTime } from 'luxon'

export default class AuthController {
  private oauth!: DiscordOAuth2

  constructor() {
    this.oauth = new DiscordOAuth2({
      clientId: Env.get('DISCORD_ID'),
      clientSecret: Env.get('DISCORD_SECRET'),
      redirectUri: Env.get('DISCORD_REDIRECT_URI'),
    })
  }
  public async loginWithToken({ auth, request, response }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        code: schema.string({
          escape: true,
          trim: true,
        }),
      }),
      cacheKey: request.url(),
    })

    let accessToken: string

    try {
      const response = await this.oauth.tokenRequest({
        grantType: 'authorization_code',
        code: data.code,
        scope: ['identify', 'email'],
      })

      accessToken = response.access_token
    } catch (error) {
      return response.badRequest('Bad token')
    }

    let discordUser
    try {
      discordUser = await this.oauth.getUser(accessToken)
    } catch (error) {
      return response.badRequest('Discord user not valid')
    }

    let user = await User.find(discordUser.id)

    if (!user) {
      user = await User.create({
        id: discordUser.id,
        username: discordUser.username,
        email: discordUser.email,
        avatar: discordUser.avatar,
      })
      user.save()
    }

    try {
      await auth.loginViaId(user.id.toString())
      auth.user!.lastLogin = DateTime.now()
      auth.user!.username = discordUser.username
      auth.user!.avatar = discordUser.avatar
      auth.user!.email = discordUser.email
      await auth.user!.save()
    } catch (error) {
      console.error(error)
      return response.internalServerError('')
    }

    return response.json(auth.user?.serialize())
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.ok(200)
  }

  public async refresh({ auth, response }: HttpContextContract) {
    try {
      await auth.authenticate()
      if (auth.user) {
        console.log(auth.user.serialize())
        return response.ok(auth.user.serialize())
      }
    } catch (_) {}
    return response.unauthorized({})
  }

  public async get({ auth, response }: HttpContextContract) {
    return response.ok(auth.user?.serialize())
  }
}
