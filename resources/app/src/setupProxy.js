const { createProxyMiddleware } = require('http-proxy-middleware')

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
