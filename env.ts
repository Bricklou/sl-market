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
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),

  // Discord information for authentication
  DISCORD_CLIENT_ID: Env.schema.string(),
  DISCORD_CLIENT_SECRET: Env.schema.string(),
  DISCORD_REDIRECT_URI: Env.schema.string(),

  /**
   * Database type:
   * You will need to specify one of them to connection the app to a database
   * By default, `sqlite` is choosed
   */
  DB_CONNECTION: Env.schema.enum.optional(['sqlite', 'mysql', 'pg', 'mssql', 'oracledb'] as const),

  // Mysql connection informations
  MYSQL_HOST: Env.schema.string({ format: 'host' }),
  MYSQL_PORT: Env.schema.number(),
  MYSQL_USER: Env.schema.string(),
  MYSQL_PASSWORD: Env.schema.string.optional(),
  MYSQL_DB_NAME: Env.schema.string(),

  // Postgres connection informations
  PG_HOST: Env.schema.string({ format: 'host' }),
  PG_PORT: Env.schema.number(),
  PG_USER: Env.schema.string(),
  PG_PASSWORD: Env.schema.string.optional(),
  PG_DB_NAME: Env.schema.string(),

  // Microsoft SQL connection informations
  MSSQL_SERVER: Env.schema.string({ format: 'host' }),
  MSSQL_PORT: Env.schema.number(),
  MSSQL_USER: Env.schema.string(),
  MSSQL_PASSWORD: Env.schema.string.optional(),
  MSSQL_DB_NAME: Env.schema.string(),

  // Oracle SQL connection informations
  ORACLE_HOST: Env.schema.string({ format: 'host' }),
  ORACLE_PORT: Env.schema.number(),
  ORACLE_USER: Env.schema.string(),
  ORACLE_PASSWORD: Env.schema.string.optional(),
  ORACLE_DB_NAME: Env.schema.string(),
})
