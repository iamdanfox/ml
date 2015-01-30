var webpack = require('webpack');

module.exports = {
  entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/dev-server',
    './scripts/Entry.cjsx'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee', '.cjsx', '.less']
  },
  module: {
    loaders: [
      { test: /\.cjsx$/, loaders: ['react-hot', 'coffee-loader', 'cjsx-loader']},
      { test: /\.coffee$/, loaders: ['react-hot', 'coffee-loader'] },
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx'] },
      { test: /\.less$/, loader: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.json$/, loaders: ['json-loader'] },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  }
};
