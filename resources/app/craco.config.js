const { whenProd } = require('@craco/craco')
const path = require('path')

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },

  webpack: {
    configure: (webpackConfig, { paths }) => {
      whenProd(() => {
        paths.appBuild = path.resolve(__dirname, '../../public')
        webpackConfig.output.path = paths.appBuild

        webpackConfig.plugins = webpackConfig.plugins.map((plugin) => {
          if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            plugin.options.filename = path.resolve(__dirname, '../views/app.edge')
          }
          return plugin
        })
      })

      return webpackConfig
    },
  },
}
