import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/stats', 'AdminController.stats')
  Route.get('/users', 'AdminController.getUsers')
})
  .prefix('admin')
  .middleware(['auth', 'admin'])
