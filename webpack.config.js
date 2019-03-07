const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: './lib/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
};