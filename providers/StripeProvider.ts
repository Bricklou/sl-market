import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Stripe from 'stripe'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class StripeProvider {
  constructor(protected app: ApplicationContract) {}

  public register(): void {
    // Register your own bindings
    this.app.container.singleton('Adonis/Addons/Stripe', () => {
      const { secretKey, options } = this.app.container
        .resolveBinding('Adonis/Core/Config')
        .get('stripe', {})

      return new Stripe(secretKey, options)
    })
  }

  public async boot(): Promise<void> {
    // All bindings are ready, feel free to use them
  }

  public async ready(): Promise<void> {
    // App is ready
  }

  public async shutdown(): Promise<void> {
    // Cleanup, since app is going down
  }
}
