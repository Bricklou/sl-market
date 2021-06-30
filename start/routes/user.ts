import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/profile', 'UsersController.getProfile')
}).prefix('user')
