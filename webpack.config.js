const path = require('path'); 
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: glob.sync('./src/**/*.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ya?ml$/,
        use: 'yaml-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/configs', to: './configs/' },
        { from: './src/icons', to: './' }
      ]
    })
  ],
  devServer: {
    static: './dist',
    hot: true,
    open: true
  }
};
