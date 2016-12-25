const webpack = require('webpack')

const babel_options = { presets: ['es2015'] }

module.exports = {
  entry: `${__dirname}/frontend/index.js`,
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot',
      io: 'socket.io-client'
    })
  ],
  module: {
    loaders: [
      { test: /\.tag$/, loader: `riotjs-loader`, exclude: /node_modules/ },
      { test: /\.js$/, loader: `babel-loader?${JSON.stringify(babel_options)}`, exclude: /node_modules/ },
    ]
  },

  devServer: {
    contentBase: 'public',
    inline: true,
  },
  devtool: "#source-map"
}
