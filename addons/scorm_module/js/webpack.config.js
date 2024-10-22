const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinifierTerser = require('html-minifier-terser');

module.exports = {
  entry: './src/bundle.ts', // Adjust the entry point as needed
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: {
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
                minify: HtmlMinifierTerser.minify,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'template.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        minify: HtmlMinifierTerser.minify,
      },
    }),
  ],
};