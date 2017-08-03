const path = require('path');

module.exports = function(env) {
  return {
    entry: {
      index: './index.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    }
  };
};
