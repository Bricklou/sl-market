import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SellerProfile extends BaseModel {
  /**
   * Profile ID
   */
  @column({ isPrimary: true })
  public id: number

  /**
   * ID of the user owning the profile
   */
  @column()
  public userId: string

  /**
   * Current status of the seller
   */
  @column()
  public status: 'available' | 'unavailable' | 'vacation'

  /**
   * Biography of the seller.
   */
  @column()
  public bio: string
}
