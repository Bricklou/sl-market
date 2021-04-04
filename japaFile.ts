/**
 * This file is called to run Japa test.
 * All explainations can be found there:
 *   - https://preview.adonisjs.com/blog/running-tests-in-adonisjs-v5
 *
 */

import 'reflect-metadata'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'
import execa from 'execa'

process.env.NODE_ENV = 'test'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

async function startHttpServer(): Promise<void> {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  await new Ignitor(__dirname).httpServer().start()
}

async function setupPort(): Promise<void> {
  process.env.PORT = String(await getPort())
}

async function runMigrations(): Promise<void> {
  await execa.node('ace', ['migration:run'], {
    stdio: 'inherit',
  })
}

async function seedDB(): Promise<void> {
  await execa.node('ace', ['db:seed'], {
    stdio: 'inherit',
  })
}

async function rollbackMigrations(): Promise<void> {
  await execa.node('ace', ['migration:rollback'], {
    stdio: 'inherit',
  })
}

/**
 * Configure test runner
 */
configure({
  files: ['test/**/*.test.ts'],
  before: [setupPort, runMigrations, seedDB, startHttpServer],
  after: [rollbackMigrations],
})
