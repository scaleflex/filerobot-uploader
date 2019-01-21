const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/js-plugin/src/index.html"),
  filename: "./index.html"
});
const reactLoadablePlugin =  new ReactLoadablePlugin({
  filename: 'build/react-loadable.json'
});

module.exports = {
  entry: path.join(__dirname, "examples/js-plugin/src/index.js"),
  output: {
    path: path.join(__dirname, "examples/js-plugin/dist"),
    filename: "airstore-uploader.[chunkhash].js",
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlWebpackPlugin, reactLoadablePlugin],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  }
};