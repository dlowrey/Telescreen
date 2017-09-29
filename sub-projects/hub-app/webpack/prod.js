const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const base = require('./base.js');

const buildPath = path.resolve(__dirname, '../public');

const prod = webpackMerge(base, {
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'bundle.js',
  },

  entry: {
    app: [
      './src/app/index.jsx',
    ],
  },

  plugins: [
    // Resolve global constant ENV to 'prod' during build
    new webpack.DefinePlugin({
      ENV: JSON.stringify('prod'),
    }),
  ],
});

module.exports = prod;
