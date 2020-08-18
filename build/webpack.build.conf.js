const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.conf');

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }), 
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [new CleanWebpackPlugin()]
});

module.exports = prodWebpackConfig;
