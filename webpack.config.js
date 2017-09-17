const path = require('path');
module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: './frontend/himc_10x_data_app.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'api', 'static', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    ]
  },
  devServer: {
    contentBase: './app/api/static/javascripts'
  },
  devtool: 'source-map'
};
