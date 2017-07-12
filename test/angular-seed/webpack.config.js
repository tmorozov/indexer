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
        'css-loader?sourceMap',
        'postcss-loader'
      ]
    }, {
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }]
  }
}
