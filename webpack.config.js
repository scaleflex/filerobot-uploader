const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    'airstore-uploader': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index.js'
    ],
    example: './src/example.js'
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'public'),
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      template: './src/index.template.html'
    }),
    new ExtractTextPlugin({
      filename: 'airstore-uploader.[contenthash].css',
    })
  ],

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: [/node_modules/],
        include: __dirname,
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          //'react-hot-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2', 'react']
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: "url-loader"
      },
      {
        test: /\.(ttf|eot)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },

  node: {
    fs: "empty"
  },

  resolve: {
    extensions: ['.js', ".ts", ".tsx", '.jsx', '.json', '*']
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 7
      }
    })
  )
} else {
  config.devtool = 'source-map';
  config.devServer = {
    contentBase: './public',
    hot: true
  };
}

module.exports = config;