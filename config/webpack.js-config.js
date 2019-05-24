const path = require('path');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const webpack = require('webpack');
const pkg = require('../package');

const now = new Date();
const banner = `
 ${pkg.name} v${pkg.version}
 ${pkg.repository.url}

 Copyright (c) 2019 ${pkg.author}
 Released under the ${pkg.license} license

 Date: ${now.toISOString()}
`;

module.exports = (env = {}) => ({
  entry: path.join(__dirname, "../projects/js-plugin/index.js"),
  output: env.latest ?
    {
      path: path.join(__dirname, `../build/${pkg.version.split('.')[0]}`),
      filename: `${pkg.name}.min.js`,
      chunkFilename: `[name].min.js`,
      jsonpFunction: 'webpackJsonp' + Date.now(),
      publicPath: `https://cdn.scaleflex.it/plugins/${pkg.name}/${pkg.version.split('.')[0]}/`
    }
    :
    {
      path: path.join(__dirname, `../build/${pkg.version}`),
      filename: `${pkg.name}.min.js`,
      chunkFilename: `[name].min.js`,
      jsonpFunction: 'webpackJsonp' + Date.now(),
      publicPath: `https://cdn.scaleflex.it/plugins/${pkg.name}/${pkg.version}/`
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /(node_modules|bower_components)\/(?!pretty-bytes\/).*/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new ReactLoadablePlugin({
      filename: path.join(__dirname, `../build/react-loadable.json`)
    }),
    new webpack.BannerPlugin(banner),
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devtool: "sourcemap",
  devServer: {
    port: 3001
  }
});