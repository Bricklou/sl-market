import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/status', 'SellersController.getSellerStatus')

  Route.group(() => {
    Route.put('/status', 'SellersController.updateSellerStatus')
  }).middleware(['auth', 'seller'])
}).prefix('seller')
