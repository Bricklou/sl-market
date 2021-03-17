import { DateTime } from 'luxon'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

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

  @column.dateTime()
  public lastLogin: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
