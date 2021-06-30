import Env from '@ioc:Adonis/Core/Env'
import { StripeConfig } from '@ioc:Adonis/Addons/Stripe'

const stripe: StripeConfig = {
  secretKey: Env.get('STRIPE_SECRET_KEY'),

  options: {
    apiVersion: Env.get('STRIPE_API_VERSION'),
  },
}

export default stripe
