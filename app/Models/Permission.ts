import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Permission extends BaseModel {
  /**
   * Permission ID
   */
  @column({ isPrimary: true })
  public id: number

  /**
   * The permission name is an human readable value showed to the user.
   * All characters are allowed.
   */
  @column()
  public name: string

  /**
   * The permission slug is an identifier.
   * It is used for permission asignation and check.
   */
  @column()
  public slug: string

  /**
   * Permission description for users.
   */
  @column()
  public description?: string
}
