const path = require('path');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const reactLoadablePlugin =  new ReactLoadablePlugin({
  filename: 'build/react-loadable.json'
});

module.exports = {
  entry: path.join(__dirname, "projects/js-plugin/index.js"),
  output: {
    path: path.join(__dirname, "build"),
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
  plugins: [reactLoadablePlugin],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  }
};