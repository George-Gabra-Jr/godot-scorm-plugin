const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinifierTerser = require('html-minifier-terser');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');


module.exports = {
  entry: './src/bundle.ts',
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html_shell.html',
      filename: 'html_shell.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        minify: HtmlMinifierTerser.minify,
      },
    }),
    new HtmlInlineScriptPlugin()
  ],
};