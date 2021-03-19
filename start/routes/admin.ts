import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/stats', 'AdminController.stats')
})
  .prefix('admin')
  .middleware(['auth', 'admin'])
