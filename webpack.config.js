const path = require('path');
const { OBJLoader } = require('three-obj-loader');

module.exports = {
  entry: './src/index.js', // the entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.obj$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.obj'],
  },
  plugins: [
    new OBJLoader()
  ]
};
