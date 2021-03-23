const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
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
    // To strip all locales except “en”
    new MomentLocalesPlugin(),
  ],
};