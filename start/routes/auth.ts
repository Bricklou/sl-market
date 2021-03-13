import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'AuthController.loginWithToken')
    Route.post('/register', 'AuthController.register')
  }).middleware('guest')

  Route.put('/', 'AuthController.refresh')

  Route.group(() => {
    Route.delete('/', 'AuthController.logout')
    Route.get('/', 'AuthController.get')
  }).middleware(['auth'])
}).prefix('/auth')
