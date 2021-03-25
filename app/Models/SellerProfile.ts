import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SellerProfile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: string

  @column()
  public status: 'available' | 'unavailable' | 'vacation'

  @column()
  public bio: string
}
