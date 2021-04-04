import test from 'japa'
import supertest from 'supertest'
import { JSDOM } from 'jsdom'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('View Controller', () => {
  test('Should get the frontend', async (assert) => {
    // Make request
    const { text } = await supertest(BASE_URL).get('/').expect(200)

    // Construct JSDOM instance using the response HTML
    const { document } = new JSDOM(text).window

    const appRoot = document.getElementById('root')
    assert.exists(appRoot)
  })
})
