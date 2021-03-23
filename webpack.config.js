const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

const config = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MAP_API: JSON.stringify(process.env.MAP_API),
        COURT_API: JSON.stringify(process.env.COURT_API),
      },
    }),
  ],
};

module.exports = config