const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const pkg = require('./package.json');

const chunksOrder = ['vendor', 'app'];

const entry = {
  app: [path.resolve(__dirname, './app/main.js')],
  vendor: [
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'redux-thunk',
    'reselect',
  ],
  polyfills: [
    path.resolve(__dirname, './app/polyfills.js'),
  ],
};

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    filename: 'vendor.bundle.js',
    name: 'vendor',
  }),
  new webpack.LoaderOptionsPlugin({ minimize: true }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
  new HtmlWebpackPlugin({
    title: 'React Redux ImmutableJS Todolist',
    minify: false,
    hash: true,
    inject: false,
    template: './index.hbs',
    chunks: [
      'vendor',
      'app',
    ],
    chunksSortMode(a, b) {
      return chunksOrder.indexOf(a.names[0]) -
        chunksOrder.indexOf(b.names[0]);
    },
  }),
];

module.exports = {
  devtool: 'source-map',
  entry,
  output: {
    path: path.join(__dirname, `../static/${pkg.version}`),
    publicPath: '/static',
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
        include: /app/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss|css$/,
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
        test: /\.png(png|jpg)$/,
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
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
    ],
  },
};
