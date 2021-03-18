import { DateTime } from 'luxon'
import { column, BaseModel, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Permission from './Permission'
import { flatten, uniq } from 'lodash'

export default class User extends BaseModel {
  @column({
    isPrimary: true,
    consume: (value: bigint) => BigInt(value).toString(),
  })
  public id: bigint

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public avatar: string

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @column.dateTime()
  public lastLogin: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async getPermissions(): Promise<Permission[]> {
    const u = this as User
    await u.preload('roles', async (query) => {
      await query.preload('permissions')
    })

    const perms: Permission[] = uniq(flatten(u.roles.map((role) => role.toJSON().permissions)))

    return perms
  }
}
