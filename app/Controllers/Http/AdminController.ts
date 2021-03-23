import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

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
          return query.select('name')
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
        return response.ok('')
      } else {
        return response.notFound('user not found')
      }
    } catch (error) {
      return response.internalServerError(error)
    }
  }
}
