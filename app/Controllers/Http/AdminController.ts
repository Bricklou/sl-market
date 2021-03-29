import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Roles from 'App/Models/Role'

/**
 * Admin controller will contain all controllers related to the administration.
 */
export default class AdminsController {
  /**
   * App statistics will return 3 values in an object:
   * - users number
   * - sellers number
   * - commands number
   *
   * An internal server error (500) will be thrown if something went wrong.
   */
  public async stats({ response }: HttpContextContract): Promise<void> {
    try {
      // Fetch users count
      const usersCount = await User.query().count('id', 'c').first()
      // Fetch seller count (all users with a role having the slug `seller`)
      const sellersCount = await User.query()
        .whereHas('roles', (query) => query.where('slug', 'seller'))
        .count('id', 'c')
        .first()

      return response.json({
        counts: {
          users: usersCount.c,
          sellers: sellersCount.c,
          commands: 0,
        },
      })
    } catch (error) {
      return response.internalServerError()
    }
  }

  /**
   * Users list fetch controller return a list of users depending on
   * the `page` value and the `search` value.
   *
   * @param {number} page Current page number
   * @param {string} search Search string
   *
   * An internal server error (500) will be thrown if something went wrong.
   */
  public async getUsers({ response, request, logger }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const search = request.input('search', null)
    try {
      // Fetch users for search (all users where username or email is like the search text)
      const users = await User.query()
        .preload('roles', (query) => {
          return query.select('name', 'slug')
        })
        .where('username', 'like', `%${search}%`)
        .orWhere('email', 'like', `%${search}%`)
        .paginate(page, 20)

      return response.json(users)
    } catch (error) {
      logger.error(error)
      return response.internalServerError(error)
    }
  }

  /**
   * The user will be deleted from the database with all his relations.
   * If all run perfectly, a 200 response will be sent.
   * If the user is not found, a 404 response will be thrown.
   * Otherwise, a 500 is thrown.
   *
   * @param {string} id The user ID
   */
  public async deleteUser({ auth, response, request }: HttpContextContract): Promise<void> {
    const userId = request.input('id')

    if (!userId) {
      return response.badRequest('"id" params is missing')
    }

    // The user can't delete itself, it would be stupid and illogical
    if (userId === auth.user!.id) {
      return response.forbidden("can't delete yourself from here")
    }

    try {
      const user = await User.find(userId)

      if (user) {
        await user.delete()
        return response.ok({})
      } else {
        return response.notFound('user not found')
      }
    } catch (error) {
      return response.internalServerError(error)
    }
  }

  /**
   * Add or remove a role for a specific user.
   *
   * @param {string} userId The concerned user ID
   * @param {string} role The role slug
   * @param {boolean} state If true, the role is added to the user. Otherwise, it is removed.
   */
  public async updateUserRole({ request, response, auth }: HttpContextContract): Promise<void> {
    const data = await request.validate({
      schema: schema.create({
        userId: schema.string(
          {
            escape: true,
            trim: true,
          },
          [
            rules.exists({
              column: 'id',
              table: 'users',
            }),
          ]
        ),
        role: schema.string(
          {
            escape: true,
            trim: true,
          },
          [
            rules.exists({
              column: 'slug',
              table: 'roles',
            }),
          ]
        ),
        state: schema.boolean(),
      }),
    })

    try {
      const role = await Roles.findBy('slug', data.role)

      if (!role) {
        return response.notFound('role not found')
      }

      const user = await User.find(data.userId)

      if (!user) {
        return response.notFound('user not found')
      }

      /**
       * If the concerned user is the current user and the updated role is `admin` then stop it.
       * The user can't remove his own `admin` role. He would risk blocking its own access.
       */
      if (user.id === auth.user!.id && role.slug === 'admin') {
        return response.forbidden("can't change this role")
      }

      // If state is `true` then add the role, else remove it.
      if (data.state) {
        await user.related('roles').attach([role.id])

        // If the role is `seller`, add a seller profile
        if (role.slug === 'seller') {
          await user.preload('sellerProfile')

          if (!user.sellerProfile) {
            const profile = await user.related('sellerProfile').create({
              status: 'available',
            })
            await profile.save()
          }
        }
      } else {
        await user.related('roles').detach([role.id])

        // If the role is `seller`, delete the user's seller profile
        if (role.slug === 'seller') {
          await user.preload('sellerProfile')

          if (user.sellerProfile) {
            await user.sellerProfile.delete()
          }
        }
      }

      return response.ok({})
    } catch (error) {
      return response.internalServerError(error)
    }
  }
}
