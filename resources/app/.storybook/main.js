const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-dark-mode',
    {
      name: 'storybook-preset-craco',
      options: {
        cracoConfigFile: path.resolve(__dirname, '../craco.config.js'),
      },
    },
  ],
}
