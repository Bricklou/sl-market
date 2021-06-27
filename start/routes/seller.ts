import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/status', 'SellersController.getSellerStatus')

  /**
   * To access to these routes, the user will need to be authenticated and have the `seller` role.
   * If one of these conditions is not verified, then a 401 response will be sent.
   */
  Route.group(() => {
    Route.put('/status', 'SellersController.updateSellerStatus')
    Route.put('/biography', 'SellersController.updateSellerBiography')

    Route.get('/link-stripe', 'SellersController.linkStripe')
    Route.get('/unlink-stripe', 'SellersController.unlinkStripe')
    Route.get('/stripe-callback', 'SellersController.stripeCallback')
  }).middleware(['auth', 'seller'])
}).prefix('seller')
