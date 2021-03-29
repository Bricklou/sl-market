const { createProxyMiddleware } = require('http-proxy-middleware')

/**
 * If dev mode, proxy the backend server to `/api`.
 * The proxy only apply for dev mode and not production mode.
 */
const proxy = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3333',
      changeOrigin: true,
    })
  )
}

module.exports = proxy
