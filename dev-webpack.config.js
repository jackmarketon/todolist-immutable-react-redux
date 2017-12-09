const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const StylelintPlugin = require('stylelint-webpack-plugin');

const entry = {
  app: [
    'react-hot-loader/patch',
    path.resolve(__dirname, './app/main.js'),
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  ],
  polyfills: [
    path.resolve(__dirname, './app/polyfills.js'),
  ],
};

const plugins = [
  new StylelintPlugin({
    configFile: path.join(__dirname, './stylelint.config.js'),
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];

module.exports = {
  devServer: {
    clientLogLevel: 'info',
    contentBase: path.join(__dirname),
    publicPath: '/static/',
    hot: true,
    historyApiFallback: true,
    stats: {
      chunkModules: true,
      colors: true,
    },
  },
  devtool: 'source-map',
  entry,
  output: {
    path: path.join(__dirname, './static'),
    publicPath: '/static/',
    filename: '[name].bundle.js',
  },
  plugins,
  resolve: {
    modules: [path.resolve('./app'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: path.resolve(__dirname, '.eslintrc'),
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: /app/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        include: /app/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: path.resolve(__dirname, './postcss.config.js'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        // This is so if you have local development
        // set up with an npm module (prb-style-library)
        // it will still run through the loader.
        exclude: /app/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
    ],
  },
};
