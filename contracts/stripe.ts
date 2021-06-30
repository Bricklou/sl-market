declare module '@ioc:Adonis/Addons/Stripe' {
  import StripeType from 'stripe'

  interface StripeOptions extends Omit<StripeType.StripeConfig, 'apiVersion'> {
    apiVersion: string | null
  }

  export interface StripeConfig {
    secretKey: string
    options: StripeOptions
  }

  const Stripe: StripeType

  export default Stripe
}
