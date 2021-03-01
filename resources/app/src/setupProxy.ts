import { createProxyMiddleware } from 'http-proxy-middleware'

const proxy = (app: any) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3333',
      changeOrigin: true
    })
  )
}

export default proxy
