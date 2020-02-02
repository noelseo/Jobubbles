const path = require("path");
const webpack = require("webpack");

const config = {
  entry: path.join(__dirname, "./js/index.js"),
  output: {
    filename: "main.js",
    path: path.join(__dirname, "./dist"),
    publicPath: "/jobubbles/"
  },
  plugins: [new webpack.ProgressPlugin()],
  devtool: "source-map"
};

module.exports = config;
