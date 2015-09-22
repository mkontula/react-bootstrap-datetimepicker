var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

  entry: {
    "basic": "./examples/basic/basic.js"
  },

  target: "web",

  output: {
    path: __dirname,
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    sourceMapFilename: "[name].map",
    assetPath: "/"
  },

  resolve: {
    alias: {
      "react-bootstrap-datetimepicker": "../../lib/DateTimeField"
    },
    extensions: ["", ".js"]
  },

  module: {
    preLoaders: [
      {test: /\.js$/, loader: "eslint-loader"}
    ],
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },


  devServer: {
    contentBase: "examples/",
    stats: {colors: true}
  },

  devtool: "eval-source-map",
  plugins: [new HtmlWebpackPlugin({
    template: path.join(__dirname, "/basic/index.html")
  })]

};
