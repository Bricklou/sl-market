import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Permission from './Permission'

export default class Role extends BaseModel {
  /**
   * Role ID
   */
  @column({ isPrimary: true })
  public id: number

  /**
   * The role name is an human readable value showed to the user.
   * All characters are allowed.
   */
  @column()
  public name: string

  /**
   * The role slug is an identifier.
   * It is used for role assignation and check.
   */
  @column()
  public slug: string

  /**
   * Role description for users.
   */
  @column()
  public description?: string

  /**
   * All the permissions linked to this role.
   * A same role can have multiple uniques permissions.
   */
  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>
}
