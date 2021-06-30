import { AllyUserContract, DiscordToken } from '@ioc:Adonis/Addons/Ally'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

/**
 * Auth controller will contain all controllers related to the authentication.
 */
export default class AuthController {
  /**
   * Redirect route for frontend
   */
  public async redirect({ ally }: HttpContextContract): Promise<void> {
    return ally.use('discord').redirect()
  }

  /**
   * Fallback for the discord OAuth2 redirection.
   * If the user exists, just login it and update his last login info.
   * Otherwise, create a new user.
   *
   * @param {string} code
   */
  public async loginWithToken({
    auth,
    ally,
    response,
    logger,
  }: HttpContextContract): Promise<void> {
    const discord = ally.use('discord')

    /**
     * User has explicitly denied the login request
     */
    if (discord.accessDenied()) {
      return response.abort('')
    }

    /**
     * Unable to verify the CSRF state
     */
    if (discord.stateMisMatch()) {
      return response.badRequest()
    }

    /**
     * There was an unknown error during the redirect
     */
    if (discord.hasError()) {
      logger.error('Error:' + discord.getError())
      return response.internalServerError()
    }

    let discordUser: AllyUserContract<DiscordToken>
    try {
      discordUser = await discord.user()
    } catch (error) {
      return response.badRequest('Discord user not valid')
    }

    try {
      const user = await User.firstOrCreate(
        {
          id: discordUser.id,
        },
        {
          id: discordUser.id,
          lastLogin: DateTime.now(),
          username: discordUser.nickName || '',
          avatar: discordUser.avatarUrl || '',
          email: discordUser.email || '',
        }
      )
      user.id = discordUser.id
      await user.save()

      // Auth the user and update all his informations from the Discord account
      await auth.loginViaId(user.id)
      auth.user!.lastLogin = DateTime.now()
      auth.user!.username = discordUser.nickName
      auth.user!.avatar = discordUser.avatarUrl || ''
      auth.user!.email = discordUser.email || ''
      await auth.user!.save()
    } catch (error) {
      console.error(error)
      return response.internalServerError(error.toString())
    }

    if (auth.user) {
      return response.json({
        id: auth.user.id,
        username: auth.user.username,
        email: auth.user.email,
        avatar: auth.user.avatar,
        permissions: (await auth.user.getPermissions()).map((perm) => perm.slug).sort(),
      })
    }
    return response.unauthorized({})
  }

  /**
   * Logout the user
   */
  public async logout({ auth, response }: HttpContextContract): Promise<void> {
    await auth.logout()
    return response.ok(200)
  }

  /**
   * Refresh the user informations and update his session
   */
  public async refresh({ auth, response }: HttpContextContract): Promise<void> {
    try {
      await auth.authenticate()
      if (auth.user) {
        await auth.user.load('roles', async (role) => {
          await role.preload('permissions')
        })
        await auth.user.load('sellerProfile')

        let perms = (await auth.user.getPermissions()).map((perm) => perm.slug).sort()

        if (auth.user.sellerProfile !== null && !auth.user.sellerProfile.isStripeLinked) {
          perms = perms.filter((e) => {
            return ['access:sellerPanel'].indexOf(e) < 0
          })
        }

        return response.json({
          id: auth.user.id,
          username: auth.user.username,
          email: auth.user.email,
          avatar: auth.user.avatar,
          permissions: perms,
        })
      }
    } catch (_) {}
    return response.unauthorized({})
  }

  /**
   * Fetch the user informations is logged-in
   */
  public async get({ auth, response }: HttpContextContract): Promise<void> {
    if (auth.user) {
      await auth.user.load('roles', async (role) => {
        await role.preload('permissions')
      })

      return response.json({
        id: auth.user.id,
        username: auth.user.username,
        email: auth.user.email,
        avatar: auth.user.avatar,
        permissions: (await auth.user.getPermissions()).map((perm) => perm.slug).sort(),
      })
    }
    return response.unauthorized({})
  }
}
