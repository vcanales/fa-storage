const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
  return {
    entry: {
      index: '../index.js'
    },
    output: {
      path: path.join(__dirname, '..dist'),
      filename: '[name].js'
    },
    plugins: [
      new htmlWebpackPlugin({
        title: 'Example',
        inject: 'head',
        template: './index.html'
      })
    ]
  };
};
