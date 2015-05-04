var webpack = require('webpack');

module.exports = [
  {
    entry: {
      app: './scripts/Entry.jsx',
      vendor: ['react/addons', 'three', 'katex'],
    },
    output: {
      filename: 'bundle.js',
      path: './build/',
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loaders: ['jsx-loader?harmony&stripTypes']
        },
      ]
    }
  },
  {
    entry: './scripts/Worker.jsx',
    output: {
      filename: 'worker.bundle.js',
      path: './build/',
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loaders: ['jsx-loader?harmony&stripTypes']
        },
      ]
    }
  }
]
