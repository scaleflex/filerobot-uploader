const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/js-plugin/src/index.html"),
  filename: "./index.html"
});
module.exports = {
  entry: path.join(__dirname, "examples/react-plugin/src/index.js"),
  output: {
    path: path.join(__dirname, "examples/react-plugin/dist"),
    filename: "airstore-uploader.js"
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
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  }
};