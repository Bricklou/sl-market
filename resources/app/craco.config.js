const { whenProd } = require('@craco/craco')
const path = require('path')

/**
 * Reconfigure React app project
 */
module.exports = {
  style: {
    postcss: {
      // Use tailwindcss with postcss
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  jest: {
    configure: {
      collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.stories.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
      ],
      coverageReporters: ['lcov'],
    },
  },

  webpack: {
    configure: (webpackConfig, { paths }) => {
      /**
       * When we build the project for production, we want to output it in the public folder in the root of the repos (`/public/`)
       * We also want to output the index file to `resources/views/app.edge`.
       */
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
