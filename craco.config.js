const sassResourcesLoader = require('craco-sass-resources-loader')

module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: [
          './src/styles/_variable.scss'
        ]
      }
    }
  ]
}
