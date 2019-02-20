const path = require('path');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const VERSION = require("../package.json").version;

const reactLoadablePlugin =  new ReactLoadablePlugin({
  filename: '../build/react-loadable.json'
});

module.exports = {
  entry: path.join(__dirname, "../projects/js-plugin/index.js"),
  output: {
    path: path.join(__dirname, "../build"),
    filename: `main.min.js`,
    chunkFilename: `[name].min.js`,
    jsonpFunction: 'webpackJsonp' + Date.now(),
    publicPath: 'https://js.filerobot.com/airstore-uploader/'
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
  plugins: [reactLoadablePlugin],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  }
};