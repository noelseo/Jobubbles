const path = require("path");
const webpack = require("webpack");

const config = {
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    filename: "main.js",
    path: path.join(__dirname, "./dist"),
  },
  plugins: [new webpack.ProgressPlugin()],
  devtool: "source-map"
};

module.exports = config;
