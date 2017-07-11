const path = require('path')

var app = path.join(__dirname, 'app')

module.exports = {
  context: app,
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'angular-templatecache-loader?module=myApp'
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  }
}
