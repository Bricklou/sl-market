/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  CACHE_VIEWS: Env.schema.boolean(),
  SESSION_DRIVER: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'testing'] as const),

  DISCORD_ID: Env.schema.string(),
  DISCORD_SECRET: Env.schema.string(),
  DISCORD_REDIRECT_URI: Env.schema.string(),

  MYSQL_HOST: Env.schema.string({ format: 'host' }),
  MYSQL_PORT: Env.schema.number(),
  MYSQL_USER: Env.schema.string(),
  MYSQL_PASSWORD: Env.schema.string.optional(),
  MYSQL_DB_NAME: Env.schema.string(),

  PG_HOST: Env.schema.string({ format: 'host' }),
  PG_PORT: Env.schema.number(),
  PG_USER: Env.schema.string(),
  PG_PASSWORD: Env.schema.string.optional(),
  PG_DB_NAME: Env.schema.string(),

  MSSQL_SERVER: Env.schema.string({ format: 'host' }),
  MSSQL_PORT: Env.schema.number(),
  MSSQL_USER: Env.schema.string(),
  MSSQL_PASSWORD: Env.schema.string.optional(),
  MSSQL_DB_NAME: Env.schema.string(),

  ORACLE_HOST: Env.schema.string({ format: 'host' }),
  ORACLE_PORT: Env.schema.number(),
  ORACLE_USER: Env.schema.string(),
  ORACLE_PASSWORD: Env.schema.string.optional(),
  ORACLE_DB_NAME: Env.schema.string(),
})
