import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SellerProfile extends BaseModel {
  /**
   * Profile ID
   */
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  /**
   * ID of the user owning the profile
   */
  @column({
    serializeAs: null,
  })
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

  /**
   * Stripe account ID for Stripe Connect
   */
  @column({
    serializeAs: 'stripeLinked',
    serialize: (val) => {
      return typeof val === 'string' && val.length > 1
    },
  })
  public stripeAccountId?: string

  public get isStripeLinked(): boolean {
    return typeof this.stripeAccountId === 'string' && this.stripeAccountId.length > 1
  }
}
