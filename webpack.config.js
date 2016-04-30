var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',

  entry: [
    'webpack-hot-middleware/client',
    './client/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  resolve: {
    // so we can require('file') instead of require('file.js')
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('development')}
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        include: __dirname,
        query: {
          presets: ['react-hmre']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
}
