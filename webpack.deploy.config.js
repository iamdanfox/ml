/* @flow */

var webpack = require('webpack');

module.exports = {
  entry: './scripts/Entry.jsx',
  output: {
    filename: './scripts/bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.cjsx', '.less']
  },
  module: {
    loaders: [
      { test: /\.cjsx$/, loaders: [ 'coffee-loader', 'cjsx-loader']},
      { test: /\.coffee$/, loaders: ['coffee-loader'] },
      { test: /\.jsx$/, loaders: ['jsx-loader?harmony&stripTypes'] }
    ]
  }
};
