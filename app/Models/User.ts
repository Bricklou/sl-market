import { DateTime } from 'luxon'
import { column, BaseModel, manyToMany, ManyToMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Permission from './Permission'
import { flatten, uniq } from 'lodash'
import SellerProfile from './SellerProfile'

export type RoleType = 'admin' | 'seller'
export default class User extends BaseModel {
  /**
   * User ID
   */
  @column({ isPrimary: true })
  public id: string

  /**
   * User username
   */
  @column()
  public username: string

  /**
   * User email
   */
  @column()
  public email: string

  /**
   * User avatar
   */
  @column()
  public avatar: string

  /**
   * All the roles linked to the user.
   * A same user can have multiples roles.
   */
  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  /**
   * If a user has the `seller` role, he will be able to have a seller profile to.
   * Otherwise, the value will be null.
   */
  @hasOne(() => SellerProfile)
  public sellerProfile: HasOne<typeof SellerProfile>

  /**
   * Datetime of the last time the user logged-in.
   */
  @column.dateTime({ autoCreate: true })
  public lastLogin: DateTime

  /**
   * Datetime of the account creation (on the app)
   */
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  /**
   * Datetime of the last account update (on the app)
   *
   * _Warning_:
   * Since the `lastLogin` is updated every time the user login,
   * this value will be updated too. Take this information into account when operating.
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async getPermissions(): Promise<Permission[]> {
    const u = this as User
    await u.load('roles', async (role) => {
      await role.preload('permissions')
    })

    const perms: Permission[] = uniq(flatten(u.roles.map((role) => role.toJSON().permissions)))

    return perms
  }

  /**
   * Check if the user as a specific role
   * @param roleSlug {string} The slug of the role
   * @returns {Promise}
   * Return a promise containing a boolean.
   * If `true` then the user has the role
   */
  public async hasRole(roleSlug: RoleType): Promise<boolean> {
    const u = await User.query()
      .sideload(this)
      .preload('roles')
      .withCount('roles', (role) => {
        role.where('slug', roleSlug)
      })
      .first()

    return u?.$extras.roles_count >= 1
  }
}
