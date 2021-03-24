import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Roles from 'App/Models/Role'

export default class AdminsController {
  public async stats({ response }: HttpContextContract) {
    try {
      const usersCount = await User.query().count('id', 'c').first()
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

  public async getUsers({ response, request, logger }: HttpContextContract) {
    const page = request.input('page', 1)
    const search = request.input('search', null)
    try {
      const users = await User.query()
        .preload('roles', (query) => {
          return query.select('name', 'slug')
        })
        .where('username', 'like', `%${search}%`)
        .orWhere('username', 'like', `%${search}%`)
        .paginate(page, 20)

      return response.json(users)
    } catch (error) {
      logger.error(error)
      return response.internalServerError(error)
    }
  }

  public async deleteUser({ auth, response, request }: HttpContextContract) {
    const userId = request.input('id')

    if (!userId) {
      return response.badRequest('"id" params is missing')
    }

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

  public async updateUserRole({ request, response, auth }: HttpContextContract) {
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
        return response.notFound('user or role not found')
      }

      if (user.id === auth.user!.id && role.slug === 'admin') {
        return response.forbidden("can't change this role")
      }

      if (data.state) {
        await user.related('roles').attach([role.id])
      } else {
        await user.related('roles').detach([role.id])
      }

      return response.ok({})
    } catch (error) {
      return response.internalServerError(error)
    }
  }
}
