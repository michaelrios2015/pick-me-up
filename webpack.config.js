const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
require('dotenv').config();
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

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
      }, 
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MAP_API: JSON.stringify(process.env.MAP_API),
        COURT_API: JSON.stringify(process.env.COURT_API),
      },
    }),
    // To strip all locales except “en”
    new MomentLocalesPlugin(),
  ],
};

module.exports = config
