/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// This routes group is used to contains all api request for the app's frontend.
Route.group(() => {
  require('./auth')
  require('./user')
  require('./admin')
  require('./seller')
}).prefix('/api')

// The rest of routes for SPA
Route.any('*', 'ViewsController.app')
