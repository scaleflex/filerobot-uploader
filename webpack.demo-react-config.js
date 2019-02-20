const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/react-plugin/src/index.html"),
  filename: "./index.html"
});
module.exports = {
  entry: path.join(__dirname, "examples/react-plugin/src/index.js"),
  output: {
    path: path.join(__dirname, "examples/react-plugin/dist"),
    filename: "filerobot-uploader-widget.[chunkhash].js",
    chunkFilename: 'filerobot-uploader-widget.[name].[chunkhash].js'
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
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: process.env.NODE_ENV === 'production' ? 'none' : "sourcemap",
  devServer: {
    port: 3001
  }
};