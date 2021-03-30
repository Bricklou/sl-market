import Route from '@ioc:Adonis/Core/Route'

/**
 * To access to these routes, the user will need to be authenticated and have the `admin` role.
 * If one of these conditions is not verified, then a 401 response will be sent.
 */
Route.group(() => {
  Route.get('/stats', 'AdminController.stats')
  Route.get('/users', 'AdminController.getUsers')
  Route.delete('/user', 'AdminController.deleteUser')
  Route.put('/user/role', 'AdminController.updateUserRole')
})
  .prefix('admin')
  .middleware(['auth', 'admin'])
